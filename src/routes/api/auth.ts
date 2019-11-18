/**
 * @file User authentication API routes
 * @author Andrey Glotov
 */

import { Router } from 'express';

import { isAuthenticated } from '../../config/passport';
import {
    getUser,
    login,
    logout,
    register,
} from '../../controllers/api/auth';

const router = Router();

/**
 * @api {post} /api/auth/login Authenticate a user
 * @apiName Login
 * @apiGroup Authentication
 * @apiPermission none
 *
 * @apiParam {String} email    Email of the user.
 * @apiParam {String} password Password for the user.
 *
 * @apiSuccess {Boolean} success True.
 */
router.post('/login', login);

/**
 * @api {post} /api/auth/register Register a new user
 * @apiName Register
 * @apiGroup Authentication
 * @apiPermission none
 *
 * @apiParam {String} fullName Full name of the new user.
 * @apiParam {String} email    Email of the new user.
 * @apiParam {String} password Password for the new user.
 *
 * @apiSuccess {Boolean} success True.
 */
router.post('/register', register);

/**
 * @api {get} /api/auth/user Request current user information
 * @apiName GetUser
 * @apiGroup Authentication
 * @apiPermission authenticated
 *
 * @apiSuccess {Boolean} success       True.
 * @apiSuccess {Object}  data          Response data.
 * @apiSuccess {String}  data.id       ID of the current user.
 * @apiSuccess {String}  data.fullName Full name of the current user.
 */
router.get('/user', isAuthenticated, getUser);

/**
 * @api {post} /api/auth/logout End the current session
 * @apiName Logout
 * @apiGroup Authentication
 * @apiPermission none
 *
 * @apiSuccess {Boolean} success True.
 */
router.post('/logout', logout);

export default router;
