const mongoose = require("mongoose")
const Schema = mongoose.Schema

const PlanSchema = new Schema({
     planName: {
        type: String,
        required: true,
      },
      user_id: {
        type: String,
        required: true,
      },

}, {timestamps: true})

const PlanModel = mongoose.model("FitnessPlanSchema", PlanSchema)

module.exports = PlanModel