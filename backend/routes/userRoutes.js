const express = require("express")
const router = express.Router()
const {login,signup, updateCheck, updateSettings, getUser} = require("../controllers/userController")

router.post("/login",  login)
router.post("/signup", signup)
router.post("/updateCheck", updateCheck)
router.post("/updateSettings", updateSettings)
router.post("/getUser", getUser)

module.exports = router

