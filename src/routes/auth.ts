/**
 * @file User authentication routes
 * @author Andrey Glotov
 */

import { Router } from 'express';

import { User } from '../models/User';
import { validateLogin, validateRegister } from '../validation/auth';

const router = Router();

/**
 * @api {post} /api/auth/login User login
 * @apiName Login
 * @apiGroup auth
 * @apiPermission none
 *
 * @apiParam {String} email Email of the user
 * @apiParam {String} password Password for the user
 *
 * @apiSuccess {String} token Generated access token for the user
 */
router.post('/login', async (req, res, next) => {
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
        res.json({ token: 'Bearer ' + accessToken });
    } catch (err) {
        next(err);
    }
});

/**
 * @api {post} /api/auth/register Register a new user
 * @apiName Register
 * @apiGroup auth
 * @apiPermission none
 *
 * @apiParam {String} fullName Full name of the user
 * @apiParam {String} email Email of the user
 * @apiParam {String} password Password for the new user
 *
 * @apiSuccess {String} token Generated access token for the user
 */
router.post('/register', async (req, res, next) => {
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
        res.json({ token: 'Bearer ' + accessToken });
    } catch (err) {
        next(err);
    }
});

export = router;
