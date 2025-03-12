const SalesAgent = require("../models/salesAgent.model");

exports.getAllAgents = async (req, res) => {
  try {
    const allAgents = await SalesAgent.find();
    res
      .status(200)
      .json({ message: "Successful in getting the sales agents", allAgents });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in getting sales agents", error: error.message });
  }
};

exports.createSalesAgent = async (req, res) => {
  try {
    const { name, email } = req.body;

    //To check if the email already exists
    const existingAgent = await SalesAgent.findOne({ email });
    if (existingAgent) {
      return res.status(409).json({
        error: `Sales agent with email '${email}' already exists.`,
      });
    }

    const newSalesAgent = new SalesAgent({ name, email });
    await newSalesAgent.save();

    res.status(201).json({
      message: "New sales agents created successfully",
      newSalesAgent,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error in creating new sales agent",
      error: error.message,
    });
  }
};

exports.deleteSalesAgent = async (req, res) => {
  try {
    const deletedSalesAgent = await SalesAgent.findByIdAndDelete(req.params.id);
    if (!deletedSalesAgent) {
      return res.status(404).json({ message: "Sales agent not found" });
    }
    res
      .status(200)
      .json({ message: "Sales Agent Deleted successfully", deletedSalesAgent });
  } catch (error) {
    res.status(404).json({
      message: "Error in deleting the sales agent",
      error: error.message,
    });
  }
};
