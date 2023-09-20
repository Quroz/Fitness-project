const express = require("express")
const router = express.Router()
const {addPlan, getPlans} = require("../controllers/planTestController")
const requireAuth = require("../middleware/requireAuth")

router.use(requireAuth)
router.post("/add",  addPlan)
router.post("/get", getPlans)

module.exports = router

