const Comment = require("../models/comments.model");
const Lead = require("../models/lead.model");

// Add a comment to a Lead
exports.addComment = async (req, res) => {
  try {
    const { id } = req.params; // Lead ID
    const { commentText, author } = req.body;
    // const author = req.user._id;

    if (!commentText) {
      return res
        .status(400)
        .json({ error: "Comment text is required and must be a string." });
    }

    // Check if the lead exists
    const lead = await Lead.findById(id);
    if (!lead) {
      return res.status(404).json({ error: `Lead with ID '${id}' not found.` });
    }

    // Create new comment
    const newComment = new Comment({
      lead: id,
      author,
      commentText,
    });

    await newComment.save();

    const savedComment = await Comment.findById(newComment._id)
      .populate("author")
      .populate("lead");

    res
      .status(201)
      .json({ message: "Comment added successfully", savedComment });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error adding comment", error: error.message });
  }
};

// Get all comments for a Lead
exports.getCommentsByLead = async (req, res) => {
  try {
    const { id } = req.params;

    const lead = await Lead.findById(id);
    if (!lead) {
      return res.status(404).json({ error: `Lead with ID '${id}' not found.` });
    }

    // Fetch all comments for the lead
    const comments = await Comment.find({ lead: id }).populate(
      "author",
      "name"
    );

    res.status(200).json({ message: "getting all comments", comments });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching comments", details: error.message });
  }
};
