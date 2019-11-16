import { Request } from 'express';
import { PassportStatic } from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';

import { User } from '../models/User';

export const jwtFromCookies = (req: Request) => req.cookies.jwt;

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const useJwtStrategy = (passport: PassportStatic) => {
    passport.use(new JwtStrategy({
        jwtFromRequest: jwtFromCookies,
        secretOrKey: JWT_SECRET,
    }, (payload, done) => {
        User.findById(payload.id)
            .then((user) => {
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            }, done);
    }));
};
