/**
 * @file User authentication routes
 * @author Andrey Glotov
 */

import { Router } from 'express';
import passport from 'passport';

import { getUser, login, logout, register } from '../controllers/auth';

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
router.post('/login', login);

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
router.post('/register', register);

/**
 * @api {get} /api/auth/user Get the current user profile
 * @apiName GetUser
 * @apiGroup auth
 * @apiPermission authenticated
 *
 * @apiSuccess {String} id The user's ID
 * @apiSuccess {String} fullName The user's full name
 */
router.get('/user', passport.authenticate('jwt', {
    session: false,
}), getUser);

router.post('/logout', logout);

export = router;
