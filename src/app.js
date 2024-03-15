import express from "express";
import { engine } from "express-handlebars";
import multer from "multer";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import { initializePassport } from "./config/passport.config.js";
import imgRouter from './router/image.routes.js';
import viewsRouter from "./router/views.routes.js";
import sessionRouter from "./router/session.routes.js";


const app = express();
const PORT = 8081;
import '../src/database.js';



// Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./src/public'));

// Middleware de multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/public/img')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
app.use(multer({ storage }).single('image'));
//Session
app.use(session({
    secret: 'secretCoder',
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://nesmanpro:g4ECFS0wHimlGF18@cluster0.we6hggz.mongodb.net/bambamcommerce?retryWrites=true&w=majority&appName=Cluster0',
        ttl: 90
    }),
}))
// Passport configuracion
app.use(passport.initialize());
app.use(passport.session());
initializePassport();



//ruta
app.use('/', imgRouter);
app.use('/', viewsRouter);
app.use('/', sessionRouter);


app.listen(PORT, () => {
    console.log(`Escuchando el puerto http://localhost:${PORT}`)
})