const express = require("express");
const router = express.Router();

const {
  getAllLeads,
  createLead,
  deletedLead,
  updateLead,
  getLeadById,
} = require("../controllers/leadController");

router.get("/", getAllLeads);
router.get("/:id", getLeadById);
router.post("/", createLead);
router.put("/:id", updateLead);
router.delete("/:id", deletedLead);

module.exports = router;
