import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    title: String,
    description: String,
    filename: String,
    path: String
});

const imageModel = new mongoose.model('images', imageSchema);

export default imageModel;