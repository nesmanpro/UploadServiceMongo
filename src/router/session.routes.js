import express from 'express';
const router = express.Router();

import passport from 'passport';

// Registro usuario

router.post('/register', passport.authenticate('register'), async (req, res) => {
    if (!req.user) return res.status(401).send({ message: 'Credenciales invalidas' });

    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        age: req.user.age,
        role: req.user.role
    };

    req.session.login = true;

    res.redirect('/')
})

// Login usuario
router.post('/login', passport.authenticate('login'), async (req, res) => {
    if (!req.user) return res.status(401).send({ message: 'Credenciales invalidas' });

    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        age: req.user.age,
        role: req.user.role
    };

    req.session.login = true;

    res.redirect('/')
})

// Logout

router.get('/logout', (req, res) => {
    if (req.session.login) {
        req.session.destroy();
    }
    res.redirect('/login')
})

// Ruta ver el perfil

router.get('/profile', (req, res) => {
    if (req.session.user) {
        res.render('profile', { user: req.session.user })
    } else {
        res.redirect('/login')
    }
})

export default router;