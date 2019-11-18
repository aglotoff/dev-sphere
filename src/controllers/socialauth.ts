/**
 * @file Social logins routes
 * @author Andrey Glotov
 */

import { RequestHandler } from 'express';
import passport from 'passport';

import { IUser } from '../models/User';

const BASE_URL = process.env.NODE_ENV === 'production' ?
    '' : 'http://localhost:3000';

/**
 * Authenticate users using an external social login provider.
 *
 * @param strategy The name of the strategy to use (e.g. 'facebook').
 */
export const socialLogin = (strategy: string): RequestHandler =>
    (req, res, next) =>
        passport.authenticate(strategy, async (
            err: string | Error | null,
            user: IUser | null,
            info?: { message: string },
        ) => {
            if (!user) {
                let errorMessage = 'Authentication Error';
                if (info) {
                    errorMessage = info.message;
                }

                errorMessage = encodeURIComponent(errorMessage);
                return res.redirect(BASE_URL + '/login?error=' + errorMessage);
            }

            const accessToken = await user.generateJwt();
            res.cookie('jwt', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
            });

            res.redirect(BASE_URL);
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
