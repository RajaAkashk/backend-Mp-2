const express = require("express");
const router = express.Router();

const {
  getAllLeads,
  createLead,
  deletedLead,
  updateLead,
} = require("../controllers/leadController");

router.get("/", getAllLeads);
router.post("/", createLead);
router.put("/:id", updateLead);
router.delete("/:id", deletedLead);

module.exports = router;
