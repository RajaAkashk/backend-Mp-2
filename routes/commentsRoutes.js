const express = require("express");
const router = express.Router();
const {
  addComment,
  getCommentsByLead,
} = require("../controllers/commentController");

// Route to add a comment to a specific lead
router.post("/leads/:id/comments", addComment);

// Route to get all comments for a specific lead
router.get("/leads/:id/comments", getCommentsByLead);

module.exports = router;
