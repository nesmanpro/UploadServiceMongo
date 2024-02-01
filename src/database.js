import mongoose from "mongoose";

mongoose.connect('mongodb://localhost:27017/Coder')
    .then(() => console.log('conectados a mongodb'))
    .catch((err) => console.log(err))