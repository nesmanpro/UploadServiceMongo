import express from "express";
const router = express.Router();
import imageModels from '../models/image.js'
import { promises as fs } from 'fs';
import path from "path";

router.get('/', async (req, res) => {
    const images = await imageModels.find();

    const newArray = images.map(img => {
        return {
            id: img._id,
            title: img.title,
            description: img.description,
            filename: img.filename,
            path: img.path
        }
    })

    res.render('index', { images: newArray });
})

// Ruta para acceder a formulario para cargar imgs
router.get('/upload', async (req, res) => {

    res.render('upload', { title: 'Upload' });
})

// Ruta post
router.post('/upload', async (req, res) => {

    const img = new imageModels();

    img.title = req.body.title;
    img.description = req.body.description;
    img.filename = req.file.filename;
    img.path = '/img/' + req.file.filename;

    await img.save()
    res.redirect('/');
})

// eliminar img

router.get('/image/:id/delete', async (req, res) => {
    const { id } = req.params;

    const img = await imageModels.findByIdAndDelete(id) //Borramos de la bd la imagen y mne guardo la referencia

    await fs.unlink(path.resolve('./src/public' + img.path)) // borramos fisicamente la img
    res.redirect('/')
})

export default router;