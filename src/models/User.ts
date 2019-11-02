import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Document, Model, model, Schema } from 'mongoose';

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const JWT_EXPIRE = 3600;

export interface IUserModel extends Document {
    /**
     * Full user name
     */
    fullName: string;

    /**
     * User email
     */
    email: string;

    /**
     * Hashed password
     */
    password: string;

    /**
     * Check password of this user.
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

userSchema.pre<IUserModel>('save', function(next) {
    if (!this.isModified('password')) {
        return next();
    }

    bcrypt.hash(this.password, SALT_ROUNDS)
        .then((hashedPassword) => {
            this.password = hashedPassword;
            next();
        }, (err) => {
            next(err);
        });
});

userSchema.methods.checkPassword = function(
    this: IUserModel,
    password: string,
) {
    return bcrypt.compare(password, this.password);
};

userSchema.methods.generateJwt = function(this: IUserModel) {
    return new Promise<string>((resolve, reject) => {
        const payload = {
            id: this.id,
            fullName: this.fullName,
        };

        const options = {
            expiresIn: JWT_EXPIRE,
        };

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
