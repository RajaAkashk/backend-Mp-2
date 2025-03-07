const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  lead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "crm_leads", 
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "crm_sales_agents",
    required: true,
  },
  commentText: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("crm_comments", commentSchema);
