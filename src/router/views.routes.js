import express, { Router } from "express";
const router = express.Router();

//rutas para renderizar

router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/register', (req, res) => {
    res.render('register');
})

router.get("/", (reg, res) => {
    res.render('main', { user: reg.session.user })
})


// router.get('/profile', (req, res) => {
//     res.render('profile');
// })


export default router;


