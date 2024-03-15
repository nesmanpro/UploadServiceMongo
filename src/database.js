import mongoose from "mongoose";

mongoose.connect('mongodb+srv://nesmanpro:g4ECFS0wHimlGF18@cluster0.we6hggz.mongodb.net/bambamcommerce?retryWrites=true&w=majority')
    .then(() => console.log('Conectado a MongoDB!'))
    .catch(() => console.log('Lo sentimos! Ha habido algun error con el servidor mongoDB'))
