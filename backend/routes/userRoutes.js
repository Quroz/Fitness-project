const express = require("express")
const router = express.Router()
const {login,signup, updateCheck} = require("../controllers/userController")

router.post("/login",  login)
router.post("/signup", signup)
router.post("/updateCheck", updateCheck)

module.exports = router

