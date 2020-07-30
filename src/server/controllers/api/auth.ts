/**
 * @file User authentication controller.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import { RequestHandler, Response } from 'express';
import passport from 'passport';

// App Imports
import { IUser, User } from '../../models/User';
import { validateLogin, validateRegister } from '../../validation/auth';

/**
 * Generate a new refresh/access token pair for the given user.
 *
 * The refresh token is kept inside an HTTP-only cookie, while the access
 * token is sent in the response body.
 *
 * @param res The HTTP response object.
 * @param user The user.
 * @param message The message inside the response.
 */
export const generateAndSendTokens = async (
    res: Response,
    user: IUser,
    message: string,
) => {
    const newRefreshToken = await user.generateRefreshToken();
    const accessToken = await user.generateAccessToken();

    res.cookie('refreshtoken', newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    });

    res.status(200).json({
        success: true,
        message,
        data: {
            accessToken,
        },
    });
};

/**
 * Handle a user login request.
 *
 * @async
 *
 * @param req The HTTP request object.
 * @param res The HTTP response object.
 * @param next Passes control to the next middleware function.
 */
export const login: RequestHandler = async (req, res, next) => {
    try {
        const { error, value } = validateLogin(req.body);
        if (error) {
            return res.status(422).send({
                success: false,
                message: 'Invalid email or password',
            });
        }

        const user = await User.findOne({ email: value.email });
        if (user == null) {
            return res.status(422).send({
                success: false,
                message: 'Invalid email or password',
            });
        }

        const passwordsMatch = await user.checkPassword(value.password);
        if (!passwordsMatch) {
            return res.status(422).send({
                success: false,
                message: 'Invalid email or password',
            });
        }

        generateAndSendTokens(res, user, 'Login successful');
    } catch (err) {
        next(err);
    }
};

/**
 * Handle a user register request.
 *
 * @async
 *
 * @param req The HTTP request object.
 * @param res The HTTP response object.
 * @param next Passes control to the next middleware function.
 */
export const register: RequestHandler = async (req, res, next) => {
    try {
        const { error, value } = validateRegister(req.body);
        if (error) {
            return res.status(422).send({
                success: false,
                message: error.details[0].message,
            });
        }

        const existingUser = await User.findOne({ email: value.email });
        if (existingUser != null) {
            return res.status(422).send({
                success: false,
                message: 'Email already exists',
            });
        }

        let user = new User({
            fullName: value.fullName,
            email: value.email,
            password: value.password,
        });

        user = await user.save();

        generateAndSendTokens(res, user, 'User successfully registered');
    } catch (err) {
        next(err);
    }
};

/**
 * Handle a get current user request.
 *
 * @async
 *
 * @param req The HTTP request object.
 * @param res The HTTP response object.
 * @param next Passes control to the next middleware function.
 */
export const getUser: RequestHandler = (req, res) => {
    const user = req.user as IUser;

    res.status(200).json({
        success: true,
        data: {
            id: user.id,
            fullName: user.fullName,
        },
    });
};

/**
 * Handle a logout request.
 *
 * @param req The HTTP request object.
 * @param res The HTTP response object.
 * @param next Passes control to the next middleware function.
 */
export const logout: RequestHandler = (req, res) => {
    res.clearCookie('refreshtoken', {
        // httpOnly: true,
        // path: '/api/auth/refresh_token',
        // secure: process.env.NODE_ENV === 'production',
    });

    res.status(200).json({
        success: true,
        message: 'User successfully logged out',
    });
};

/**
 * Handle a refresh token request.
 *
 * @param req The HTTP request object.
 * @param res The HTTP response object.
 * @param next Passes control to the next middleware function.
 */
export const refreshToken: RequestHandler = (
    req,
    res,
    next,
) => passport.authenticate(
    'refresh-token',
    (
        err: string | Error | null,
        user: IUser | false,
    ) => {
        try {
            if (err || !user) {
                return res.status(401).send({
                    success: false,
                    message: err || 'Unauthorized',
                });
            }

            if (user.refreshToken !== req.cookies.refreshtoken) {
                return res.status(401).send({
                    success: false,
                    message: err || 'Unauthorized',
                });
            }

            generateAndSendTokens(res, user, 'New token generated');
        } catch (e) {
            return next(e);
        }
    },
)(req, res, next);
