const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const userModel = require("../models/UserModel");
require('dotenv').config();

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
}

const login = async (req, res) => {
    const { email, password } = req.body;

    console.log("login")

    if (!email || !password) {
        return res.status(400).json({ error: "Both fields must be filled" });
    }

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "User does not exist" });
        }

        const matchedPassword = await bcrypt.compare(password, user.password);

        if (!matchedPassword) {
            return res.status(401).json({ error: "Wrong password" });
        }

        const token = createToken(user._id);
        const { name, weight, height, age, goals } = user;

        res.status(200).json({ token, email, name, weight, height, age, goals });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error", message: error.message });
    }
}

const signup = async (req, res) => {
    const { email, password, name, weight, height, age } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Both fields must be filled" });
    }


    if (!validator.isStrongPassword(password)) {
        return res.status(400).json({ error: "Please enter a strong password" });
    }

    try {
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ error: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const goals = [" "];

        const newUser = await userModel.create({ email, password: hashedPassword, name, weight, height, age, goals });

        const token = createToken(newUser._id);

        res.status(200).json({ token, email, name, weight, height, age, goals });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error", message: error.message });
    }
}

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
    if (goals !== "" && goals.length > 0) {
        update.$push = { goals: { $each: goals } };
    }

    try {
        const updatedSettings = await userModel.findOneAndUpdate(
            { email },
            update,
            { new: true }
        );

        const token = createToken(updatedSettings._id);
        if (updatedSettings) {
            return res.status(200).json({ updatedSettings, token });
        } else {
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
}

async function getUser(req, res) {
    const { email } = req.body;

    try {
        const user = await userModel.findOne({ email });
        const token = createToken(user._id);
        res.status(200).json({ user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function updateCheck(req, res) {
    const { email, check } = req.body;

    try {
        const updatedUser = await userModel.findOneAndUpdate(
            { email },
            { $push: { check: { $each: check } } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", message: error.message });
    }
}

module.exports = { login, signup, updateCheck, updateSettings, getUser };
