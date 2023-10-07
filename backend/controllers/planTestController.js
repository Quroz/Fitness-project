const planTestModel = require("../models/planTestModel");

async function getPlans(req, res) {
  const user_id = req.user._id;

  try {
    const plans = await planTestModel.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(plans);
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
}

async function addPlan(req, res) {
  const { planName } = req.body;

  try {
    const user_id = req.user._id;
    const addedPlan = await planTestModel.create({ planName, user_id });

  
    req.plan = addedPlan._id;

    res.status(200).json(addedPlan);
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
}

module.exports = { addPlan, getPlans };
