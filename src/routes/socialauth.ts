/**
 * @file Social login routes.
 * @author Andrey Glotov
 */

import { Router } from 'express';
import passport from 'passport';

import { loginWithFacebook, loginWithGoogle } from '../controllers/socialauth';

const router = Router();

router.get('/google', passport.authenticate('google', {
    session: false,
    scope: [ 'email', 'profile' ],
}));

router.get('/google/callback', loginWithGoogle);

router.get('/facebook', passport.authenticate('facebook', {
    session: false,
    scope: 'email',
}));

router.get('/facebook/callback', loginWithFacebook);

export default router;
