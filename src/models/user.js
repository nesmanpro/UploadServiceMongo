import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    first_name: String,
    second_name: String,
    email: {
        type: String,
        unique: true
    },
    age: Number,
    password: String,
    role: {
        type: String,
        default: 'user'
    }
});

const UserModel = mongoose.model('user', userSchema);

export default UserModel;