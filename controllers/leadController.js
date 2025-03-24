const mongoose = require("mongoose");
const Leads = require("../models/lead.model");

exports.getAllLeads = async (req, res) => {
  try {
    let query = {};
    if (req.query.salesAgent) {
      query.salesAgent = new mongoose.Types.ObjectId(req.query.salesAgent);
    }
    if (req.query.status) {
      query.status = req.query.status;
    }
    console.log("Query being executed:", query);
    const leads = await Leads.find(query)
      .populate("salesAgent")
      .populate("tags");
    res.status(200).json({ message: "Successfully getting the leads", leads });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred while getting all leads",
      error: error.message,
    });
  }
};

exports.getLeadById = async (req, res) => {
  try {
    const lead = await Leads.findById(req.params.id) // Use req.params.id
      .populate("salesAgent")
      .populate("tags");

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.status(200).json({ message: "Successfully retrieved lead", lead });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred while getting lead by ID",
      error: error.message,
    });
  }
};

exports.createLead = async (req, res) => {
  try {
    const newLead = new Leads(req.body);
    const savedLead = await newLead.save();
    const populatedLead = await Leads.findById(savedLead._id)
      .populate("salesAgent")
      .populate("tags");
    res
      .status(201)
      .json({ message: "New Lead added successfully", populatedLead });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error in creating new lead", error: error.message });
  }
};

exports.updateLead = async (req, res) => {
  try {
    const updatedLead = await Leads.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .populate("salesAgent")
      .populate("tags");
    if (!updatedLead) {
      return res.status(404).json({ message: "Lead not found" });
    }
    res.status(200).json({ message: "Lead updated successfully", updatedLead });
  } catch (error) {
    res
      .status(404)
      .json({ message: "Error in updating the lead", error: error.message });
  }
};

exports.deletedLead = async (req, res) => {
  try {
    const deletedLead = await Leads.findByIdAndDelete(req.params.id);
    if (!deletedLead) {
      return res.status(404).json({ message: "Lead not found" });
    }
    res.status(200).json({ message: "Deleted successfully", deletedLead });
  } catch (error) {
    res
      .status(404)
      .json({ message: "Error in deleting the lead", error: error.message });
  }
};
