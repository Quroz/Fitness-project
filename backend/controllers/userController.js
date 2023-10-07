const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const validator = require("validator")
const userModel = require("../models/UserModel")
require('dotenv').config()


const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(404).json({ Error: "Both fields must be filled" });
    }

    try {
        const user = await userModel.findOne({ email }); 

        console.log("user ere", user)

        if (!user) {
            return res.status(404).json({ Error: "User does not exist" });
        }

        const matchedPassword = await bcrypt.compare(password, user.password);

        if (!matchedPassword) {
            return res.status(400).json({ Error: "Wrong password" });
        }

        const token = createToken(user._id);
        const name = user.name
        const weight = user.weight
        const height = user.height
        const age = user.age
        const goals = user.goals

        res.status(200).json({ token, email, name, weight , height, age, goals });
    } catch (error) {
        return res.status(404).json({ Error: error.message });
    }
}


const signup = async (req, res) => {
    const { email, password, name, weight, height, age } = req.body;

    if (!email || !password) {
        return res.status(404).json({ Error: "Both fields must be filled" });
    }

    if (!validator.isEmail(email)) {
        return res.status(404).json({ Error: "Please enter a valid email" });
    }

    if (!validator.isStrongPassword(password)) {
        return res.status(404).json({ Error: "Please enter a strong password" });
    }

    try {
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ Error: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const goals = [" "]

        const newUser = await userModel.create({ email, password: hashedPassword, name, weight, height, age, goals: goals });

        const token = createToken(newUser._id);

        res.status(200).json({ token, email, name, weight, height, age, goals });
    } catch (error) {
        return res.status(404).json({ Error: error.message });
    }
};


async function updateSettings(req, res) {
    const { email, weight, height, age, goals } = req.body;

    const update = {};

    if (weight !== "") {
        update.weight = weight;
    }
    if (height !== "") {
        update.height = height;
    }
    if (age !== "") {
        update.age = age;
    }
    if (goals != "" && goals.length > 0) {
        update.$push = { goals: { $each: goals } };
    }

    try {
        const updatedSettings = await userModel.findOneAndUpdate(
            { email },
            update, 
            { new: true }
        );

        console.log(updatedSettings)
        if (updatedSettings) {
            return res.status(200).json({ updatedSettings });
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

  
async function updateCheck(req, res) {
    const { email,check } = req.body;
   

    try {
        const updatedWorkout = await userModel.findOneAndUpdate(
            { email},
            { $push: { check: { $each: check } } }, 
            { new: true }
        );

        if (!updatedWorkout) {
            return res.status(404).json({ Error: "Workout not found" });
        }

        res.status(200).json(updatedWorkout);
    } catch (error) {
        res.status(400).json({ Error: error.message });
    }
}

module.exports = {login, signup, updateCheck, updateSettings}

