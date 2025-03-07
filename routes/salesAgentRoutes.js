const express = require("express");
const router = express.Router();

const {
  getAllAgents,
  createSalesAgent,
  deleteSalesAgent,
} = require("../controllers/salesAgentController");

router.get("/", getAllAgents);
router.post("/", createSalesAgent);
router.delete("/:id", deleteSalesAgent);

module.exports = router;
