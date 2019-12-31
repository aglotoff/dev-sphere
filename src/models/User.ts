/**
 * @file User model definition
 * @author Andrey Glotov
 */

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Document, model, Schema } from 'mongoose';

/**
 * Appication user instance
 */
export interface IUser extends Document {
    /** Full user name */
    fullName: string;

    /** User email ID */
    email: string;

    /** Password (empty for OAuth users) */
    password?: string;

    /** User creation date */
    createdAt?: Date;

    /** Refresh token for the user */
    refreshToken?: string;

    /** Associated OAuth accounts */
    oAuthProfiles: [{
        /** The provider with which the user authenticated */
        provider: string,

        /** A unique identifier for the user, as generated by the provider */
        id: string,
    }];

    /**
     * Check password of this user.
     *
     * @async
     *
     * @param password The password to check.
     *
     * @returns
     *  A promise which resolves to <code>true</code> if the passwords match or
     *  <code>false<code> if the passwords do not match.
     */
    checkPassword(password: string): Promise<boolean>;

    /**
     * Generate a new access token for the user.
     *
     * @returns A promise which resolves to the generated access token.
     */
    generateAccessToken(): Promise<string>;

    /**
     * Generate and save a new refresh token for the user.
     *
     * @returns A promise which resolves to the generated refresh token.
     */
    generateRefreshToken(): Promise<string>;
}

const ACCESS_TOKEN_EXPIRE = 60;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'secret';
const REFRESH_TOKEN_EXPIRE = 60 * 60 * 24 * 7;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'secret';
const SALT_ROUNDS = 10;

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
        min: 6,
        max: 1024,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    refreshToken: {
        type: String,
    },
    oAuthProfiles: [{
        provider: {
            type: String,
            required: true,
        },
        id: {
            type: String,
            required: true,
        },
    }],
});

userSchema.pre<IUser>('save', async function() {
    // Hash the password every time the user is being created or changed
    if (this.isModified('password') && this.password) {
        const hashedPassword = await bcrypt.hash(this.password, SALT_ROUNDS);
        this.password = hashedPassword;
    }
});

userSchema.methods.checkPassword = async function(
    this: IUser,
    password: string,
) {
    // Disable local authentication for OAuth users which have not yet created a
    // password
    if (!this.password) {
        return false;
    }

    const passwordsMatch = await bcrypt.compare(password, this.password);
    return passwordsMatch;
};

userSchema.methods.generateRefreshToken = function(this: IUser) {
    const payload = {
        id: this.id,
    };

    const options = {
        expiresIn: REFRESH_TOKEN_EXPIRE,
    };

    // Unfortunately, jwt.sign doesn't return promises (yet)
    return new Promise<string>((resolve, reject) => {
        jwt.sign(payload, REFRESH_TOKEN_SECRET, options, (err, encoded) => {
            if (err) {
                reject(err);
            } else {
                this.refreshToken = encoded;
                this.save().then(() => resolve(encoded), reject);
            }
        });
    });
};

userSchema.methods.generateAccessToken = function(this: IUser) {
    const payload = {
        id: this.id,
    };

    const options = {
        expiresIn: ACCESS_TOKEN_EXPIRE,
    };

    // Unfortunately, jwt.sign doesn't return promises (yet)
    return new Promise<string>((resolve, reject) => {
        jwt.sign(payload, ACCESS_TOKEN_SECRET, options, (err, encoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(encoded);
            }
        });
    });
};

export const User = model<IUser>('User', userSchema);
