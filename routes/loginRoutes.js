const express = require("express");
const jwt = require("jsonwebtoken");
const SalesAgent = require("../models/salesAgent.model");
require("dotenv").config();

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await SalesAgent.findOne({ email });
    if (!user) return res.status(400).json({ error: "Sales agent not found" });

    if (password !== process.env.UNIVERSAL_PASSWORD) {
      return res.status(400).json({ error: "Invalid password" });
    }

    //generate jwt token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({
      message: "Login successfully",
      token,
      user: { id: user._id, email: user.email, name: user.name },
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
