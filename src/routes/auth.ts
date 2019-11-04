/**
 * @file User authentication routes
 * @author Andrey Glotov
 */

import { Router } from 'express';

import { login, register } from '../controllers/auth';

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

export = router;
