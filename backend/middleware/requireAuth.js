const jwt = require("jsonwebtoken")
const UserModel = require("../models/UserModel")
require('dotenv').config()


async function requireAuth(req,res,next){
    
    const {authorization} = req.headers 

    if(!authorization){
        res.status(401).json({Error: "Authorization token required"})
    }

    const token = authorization.split(" ")[1]

    try {
       const {_id} = jwt.verify(token, process.env.SECRET)

       req.user = await UserModel.findOne({_id}).select("_id")
       next()

    } catch (error) {
        res.status(401).json({Error: error.message})
    }
}


module.exports = requireAuth