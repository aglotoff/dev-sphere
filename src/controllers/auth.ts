/**
 * @file User authentication controller
 * @author Andrey Glotov
 */

import { RequestHandler } from 'express';

import { IUserModel, User } from '../models/User';
import { validateLogin, validateRegister } from '../validation/auth';

/**
 * Handle a user login request.
 *
 * @async
 *
 * @param req The HTTP request object
 * @param res The HTTP response object
 * @param next Passes control to the next middleware function
 */
export const login: RequestHandler = async (req, res, next) => {
    try {
        const { error, value } = validateLogin(req.body);
        if (error !== null) {
            return res.status(422).send({ error: error.details[0].message });
        }

        const user = await User.findOne({ email: value.email });
        if (user == null) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const passwordsMatch = await user.checkPassword(value.password);
        if (!passwordsMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const accessToken = await user.generateJwt();
        res.cookie('jwt', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        });
        res.status(200).json({
            id: user.id,
            fullName: user.fullName,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * Handle a user register request.
 *
 * @async
 *
 * @param req The HTTP request object
 * @param res The HTTP response object
 * @param next Passes control to the next middleware function
 */
export const register: RequestHandler = async (req, res, next) => {
    try {
        const { error, value } = validateRegister(req.body);
        if (error !== null) {
            return res.status(422).send({ error: error.details[0].message });
        }

        const existingUser = await User.findOne({ email: value.email });
        if (existingUser != null) {
            return res.status(422).send({ error: 'Email already exists' });
        }

        const user = new User({
            fullName: value.fullName,
            email: value.email,
            password: value.password,
        });

        const savedUser = await user.save();

        const accessToken = await savedUser.generateJwt();
        res.cookie('jwt', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        });
        res.status(200).json({
            id: savedUser.id,
            fullName: savedUser.fullName,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * Handle a get current user request.
 *
 * @async
 *
 * @param req The HTTP request object
 * @param res The HTTP response object
 * @param next Passes control to the next middleware function
 */
export const getUser: RequestHandler = async (req, res, next) => {
    const user = req.user as IUserModel;

    res.json({
        id: user.id,
        fullName: user.fullName,
    });
};

/**
 * Handle a logout request.
 *
 * @param req The HTTP request object
 * @param res The HTTP response object
 * @param next Passes control to the next middleware function
 */
export const logout: RequestHandler = (req, res, next) => {
    res.clearCookie('jwt').status(200).json({ success: true });
};
