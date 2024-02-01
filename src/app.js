import express from "express";
import { engine } from "express-handlebars";
import multer from "multer";
import imgRouter from './router/image.routes.js'
const app = express();
const PORT = 8080;
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
app.use(multer({ storage }).single('image'))


//ruta
app.use('/', imgRouter)


app.listen(PORT, () => {
    console.log(`Escuchando el puerto http://localhost:${PORT}`)
})