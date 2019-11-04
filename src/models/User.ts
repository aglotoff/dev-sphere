/**
 * @file User model definition
 * @author Andrey Glotov
 */

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Document, Model, model, Schema } from 'mongoose';

/** App User Model  */
export interface IUserModel extends Document {
    /** Full user name */
    fullName: string;

    /** User email ID */
    email: string;

    /** Password (hashed on save) */
    password: string;

    /**
     * Check password of this user.
     *
     * @async
     *
     * @param password The password to check
     *
     * @returns
     *  A promise which resolves to <code>true</code> if the passwords match or
     *  <code>false<code> if the passwords do not match
     */
    checkPassword(password: string): Promise<boolean>;

    /**
     * Generate access token for the user.
     *
     * @returns A promise which resolves to the generated access token
     */
    generateJwt(): Promise<string>;
}

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const JWT_EXPIRE = 60 * 60;

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        min: 3,
        max: 320,
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

userSchema.pre<IUserModel>('save', async function() {
    // Hash the password every time the user is being created or changed
    if (this.isModified('password')) {
        const hashedPassword = await bcrypt.hash(this.password, SALT_ROUNDS);
        this.password = hashedPassword;
    }
});

userSchema.methods.checkPassword = async function(
    this: IUserModel,
    password: string,
) {
    const passwordsMatch = await bcrypt.compare(password, this.password);
    return passwordsMatch;
};

userSchema.methods.generateJwt = function(this: IUserModel) {
    const payload = {
        id: this.id,
        fullName: this.fullName,
    };

    const options = {
        expiresIn: JWT_EXPIRE,
    };

    // Unfortunately, jwt.sign doesn't return promises (yet)
    return new Promise<string>((resolve, reject) => {
        jwt.sign(payload, JWT_SECRET, options, (err, encoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(encoded);
            }
        });
    });
};

export const User: Model<IUserModel> = model<IUserModel>('User', userSchema);
