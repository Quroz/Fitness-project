const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    weight: {
        type: String,
        required: true,
    },
    height: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    goals: [
        {
            type: String,
            required: true
        }
    ]
    

}, {timestamps: true})

const UserModel = mongoose.model("FitnessUserSchema", UserSchema)

module.exports = UserModel