/**
 * @file Configuration settings for Passport.js.
 * @author Andrey Glotov
 */

import { Request } from 'express';
import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';

import { RequestHandler } from 'express-serve-static-core';
import { IUser, User } from '../models/User';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'secret';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'secret';

/**
 * Extract a JWT from the session cookie.
 *
 * @param req The HTTP request object.
 */
export const jwtFromCookie = (req: Request) => req.cookies.refreshtoken;

/**
 * Authenticate using a JSON Web token stored inside a session cookie.
 */
passport.use('refresh-token', new JwtStrategy({
    jwtFromRequest: jwtFromCookie,
    secretOrKey: REFRESH_TOKEN_SECRET,
}, async (payload, done) => {
    try {
        const user = await User.findById(payload.id);
        if (user) {
            return done(null, user);
        } else {
            return done('Unauthorized', false);
        }
    } catch (err) {
        return done('Unauthorized', false);
    }
}));

/**
 * Authenticate using a JSON Web token stored inside a session cookie.
 */
passport.use('access-token', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: ACCESS_TOKEN_SECRET,
}, async (payload, done) => {
    try {
        const user = await User.findById(payload.id);
        if (user) {
            return done(null, user);
        } else {
            return done('Unauthorized', false);
        }
    } catch (err) {
        return done('Unauthorized', false);
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
 * @param accessToken OAuth access token.
 * @param refreshToken OAuth refresh token.
 * @param profile User profile information.
 * @param done Callback to complete authentication.
 */
export const oAuthVerify = async (
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
        return done(err, null, { message: 'Authentication error ):' });
    }
};

const SERVER_NAME = process.env.SERVER_NAME || '';

/**
 * Sign in with Facebook account.
 */
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID || 'abc',
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET || 'abc',
    callbackURL: SERVER_NAME + '/socialauth/facebook/callback',
    profileFields: [ 'emails', 'displayName' ],
}, oAuthVerify));

/**
 * Sign in with Google account.
 */
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || 'abc',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'abc',
    callbackURL: SERVER_NAME + '/socialauth/google/callback',
}, oAuthVerify));

/**
 * Authentication required middleware.
 */
export const isAuthenticated: RequestHandler = (req, res, next) => {
    passport.authenticate('access-token', {
        session: false,
    }, (
        err: string | null,
        user: IUser | false,
        info?: { name: string },
    ) => {
        if (!user) {
            if (info && (info.name === 'TokenExpiredError')) {
                res.status(401).send({
                    success: false,
                    message: 'Access token expired',
                });
            } else {
                res.status(401).send({
                    success: false,
                    message: err || 'Unauthorized',
                });
            }
        } else {
            req.user = user;
            next();
        }
    })(req, res, next);
};
