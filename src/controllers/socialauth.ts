/**
 * @file Social logins routes.
 * @author Andrey Glotov
 */

import { RequestHandler } from 'express';
import passport from 'passport';

import { IUser } from '../models/User';

const SERVER_NAME = process.env.SERVER_NAME || 'http://localhost:3000';

/**
 * Authenticate users using an external social login provider.
 *
 * @param strategy The name of the strategy to use (e.g. 'facebook').
 */
export const socialLogin = (strategy: string): RequestHandler =>
    (req, res, next) =>
        passport.authenticate(strategy, async (
            err: string | Error | null,
            user: IUser | false,
            info?: { message: string },
        ) => {
            try {
                if (!user) {
                    let errorMsg = 'Authentication Error Nanana';
                    if (info) {
                        errorMsg = info.message;
                    }

                    errorMsg = encodeURIComponent(errorMsg);
                    return res.redirect(SERVER_NAME + '/login?error=' + errorMsg);
                }

                const newRefreshToken = await user.generateRefreshToken();
                res.cookie('refreshtoken', newRefreshToken, {
                    httpOnly: true,
                    path: '/api/auth/refresh_token',
                    secure: process.env.NODE_ENV === 'production',
                });

                return res.redirect(SERVER_NAME + '/');
            } catch (err) {
                return next(err);
            }
        },
    )(req, res, next);

/**
 * Authenticate with Facebook.
 */
export const loginWithFacebook = socialLogin('facebook');

/**
 * Authenticate with Google.
 */
export const loginWithGoogle = socialLogin('google');
