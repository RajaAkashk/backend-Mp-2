const mongoose = require("mongoose");

const LeadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    source: {
      type: String,
      required: true,
      enum: [
        "Website",
        "Referral",
        "Cold Call",
        "Advertisement",
        "Email",
        "Other",
      ],
    },
    salesAgent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "crm_sales_agents",
      required: true,
    },
    status: {
      type: String,
      enum: ["New", "Contacted", "Qualified", "Proposal Sent", "Closed"],
      default: "New",
    },
    tags: [{ type: String }],
    timeToClose: { type: Number, required: true },
    priority: { type: String, enum: ["High", "Medium", "Low"], required: true },
    closedAt: { type: Date }, // The date when the lead was closed (optional, used when status is "Closed")
  },
  { timestamps: true }
);

module.exports = mongoose.model("crm_leads", LeadSchema);
