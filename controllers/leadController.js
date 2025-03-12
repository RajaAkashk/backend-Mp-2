const Leads = require("../models/lead.model");

exports.getAllLeads = async (req, res) => {
  try {
    const leads = await Leads.find().populate("salesAgent").populate("tags");
    res.status(200).json({ message: "Successfully getting the leads", leads });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred while getting all leads",
      error: error.message,
    });
  }
};

exports.createLead = async (req, res) => {
  try {
    const newLead = new Leads(req.body);
    const savedLead = await newLead.save();
    res.status(201).json({ message: "New Lead added successfully", savedLead });
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
    });
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
