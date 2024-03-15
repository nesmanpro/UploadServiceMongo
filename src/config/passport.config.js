import passport from "passport";
import local from 'passport-local';

import UserModel from "../models/user.js";
import { isValidPassword, createHash } from "../utils/hashbcrypt.js";

const LocalStrategy = local.Strategy;

export const initializePassport = () => {

    passport.use('register', new LocalStrategy({

        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username, password, done) => {
        const { first_name, last_name, email, age, role = 'User' } = req.body;
        try {

            let user = await UserModel.findOne({ email });
            if (user) return done(null, false);

            let newUser = {
                first_name,
                last_name,
                email,
                age,
                role,
                password: createHash(password)
            }

            let result = await UserModel.create(newUser);

            return done(null, result);
        } catch (error) {
            return done(error);
        }
    }));

    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async (email, password, done) => {
        try {
            const user = await UserModel.findOne(({ email }));

            //Verifica si existe usuario
            if (!user) {
                console.log('Usuario inexistente!');
                return done(null, false)
            }
            //Verifica si constraseña es valida
            if (!isValidPassword(password, user)) return done(null, false);
            //retorna usuario si todo esta ok
            return done(null, user);

        } catch (error) {
            return done(error)
        }

    }));

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        let user = await UserModel.findOne({ _id: id });
        done(null, user)
    })

}
