const express = require("express");
const rateLimit = require("express-rate-limit");
const Lead = require("../models/Lead");

const router = express.Router();

const submitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many submissions. Try again later." },
});

router.post("/", submitLimiter, async (req, res) => {
  try {
    const { name, email, projectType, budgetRange, message } = req.body || {};
    if (!name || !email || !projectType || !budgetRange || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }
    const lead = await Lead.create({
      name: String(name),
      email: String(email),
      projectType: String(projectType),
      budgetRange: String(budgetRange),
      message: String(message),
    });
    res.status(201).json({
      id: lead._id,
      message: "Thank you — we will be in touch shortly.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not save your request." });
  }
});

module.exports = router;
