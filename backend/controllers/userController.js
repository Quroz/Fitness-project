const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const validator = require("validator")
const userModel = require("../models/UserModel")
require('dotenv').config()


const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

const login = async (req,res) => {
    
    const {firstName, lastName, email, password} = req.body

    if(!email || !password || !firstName || !lastName){
        return res.status(404).json({Error: "Both fields must be filled"})
    }

    const user = await userModel.find({email})

    if(!user){
        return res.status(404).json({Error: "User does not exist"})
    }

    const matchedPassword =  await bcrypt.compare(password, user.password)

    if(!matchedPassword){
        return res.status(400).json({Error: "Wrong password"})
    }

    const token = createToken(user._id)

    res.status(200).json({token, email})

}

const signup = async (req,res) => {
    
    const {firstName, lastName, email, password} = req.body

    if(!email || !password || !firstName || !lastName){
        return res.status(404).json({Error: "Both fields must be filled"})
    }

    if(!validator.isEmail(email)){
        return res.status(404).json({Error: "Please enter a valid emaail"})
    }

    if(!validator.isStrongPassword(password)){
        return res.status(404).json({Error: "Please enter a strong password"})
    }

    try {
        
        const user = await userModel.find({email})

        if(user){
            return res.status(400).json({Error: "User already exists"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = await userModel.create({firstName, lastName, email, password: hashedPassword})

        const token = createToken(newUser._id)

        res.status(200).json({token, email})


    } catch (error) {
        return res.status(404).json({Error: error.message})
    }


}



module.exports = {login, signup}

