/**
 * @file Configuration settings for Passport.js
 * @author Andrey Glotov
 */

import { Request } from 'express';
import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import { Strategy as JwtStrategy } from 'passport-jwt';

import { IUser, User } from '../models/User';
import { RequestHandler } from 'express-serve-static-core';

/**
 * Extract a JWT from the session cookie.
 *
 * @param req The HTTP request object.
 */
export const jwtFromCookies = (req: Request) => req.cookies.jwt;

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

/**
 * Authenticate using a JSON Web token stored inside a session cookie.
 */
passport.use(new JwtStrategy({
    jwtFromRequest: jwtFromCookies,
    secretOrKey: JWT_SECRET,
}, async (payload, done) => {
    try {
        const user = await User.findById(payload.id);

        if (user) {
            return done(null, user);
        } else {
            return done('Unauthorized');
        }
    } catch (err) {
        return done('Unauthorized');
    }
}));

/**
 * Verify callback to configure OAuth 2.0 authentication strategies.
 *
 * 1. If there is an existing account with a provider id, sign in.
 * 2. Else check if there is an existing account with user's email. If there is,
 *    return an error message. Account merging not supported (yet).
 * 3. Else create a new account.
 *
 * @param accessToken OAuth access token
 * @param refreshToken OAuth refresh token
 * @param profile User profile information
 * @param done Callback to complete authentication
 */
export const verify = async (
    accessToken: string,
    refreshToken: string,
    profile: passport.Profile,
    done: (
        error: string | Error | null,
        user?: IUser | null,
        info?: { message: string },
    ) => void,
) => {
    try {
        const existingUser = await User.findOne({
            oAuthProfiles: {
                $elemMatch: {
                    provider: profile.provider,
                    id: profile.id,
                },
            },
        });
        if (existingUser) {
            return done(null, existingUser);
        }

        if (!profile.emails || profile.emails.length === 0) {
            return done(null, null, {
                message: 'Email address is missing',
            });
        }

        const existingEmailUser = await User.findOne({
            email: profile.emails[0].value,
        });
        if (existingEmailUser) {
            return done(null, null, {
                message: 'There is already an account with this email address',
            });
        }

        const user = new User({
            fullName: profile.displayName,
            email: profile.emails[0].value,
            oAuthProfiles: [{
                provider: profile.provider,
                id: profile.id,
            }],
        });

        const savedUser = await user.save();
        return done(null, savedUser);
    } catch (err) {
        return done(err, null, { message: 'Authentication error' });
    }
};

/**
 * Sign in with Facebook account.
 */
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID || 'abc',
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET || 'abc',
    callbackURL: '/socialauth/facebook/callback',
    profileFields: [ 'emails', 'displayName' ],
}, verify));

/**
 * Sign in with Google account.
 */
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || 'abc',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'abc',
    callbackURL: '/socialauth/google/callback',
}, verify));

/**
 * Authentication required middleware.
 */
export const isAuthenticated: RequestHandler = (req, res, next) => {
    passport.authenticate('jwt', {
        session: false,
    }, (
        err: string | null,
        user: IUser | null,
    ) => {
        if (err || !user) {
            res.status(401).send({
                success: false,
                message: err || 'Unauthorized',
            });
        } else {
            req.user = user;
            next();
        }
    })(req, res, next);
};
