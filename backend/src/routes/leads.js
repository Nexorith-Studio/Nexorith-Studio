const express = require("express");
const rateLimit = require("express-rate-limit");
const Lead = require("../models/Lead");

const crypto = require("crypto");
const router = express.Router();

function generateTrackingId() {
  return "NX-" + crypto.randomBytes(4).toString("hex").toUpperCase();
}

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

    let trackingId = generateTrackingId();
    // Ensure uniqueness (basic check)
    let exists = await Lead.findOne({ trackingId });
    while (exists) {
      trackingId = generateTrackingId();
      exists = await Lead.findOne({ trackingId });
    }

    const lead = await Lead.create({
      name: String(name),
      email: String(email),
      projectType: String(projectType),
      budgetRange: String(budgetRange),
      message: String(message),
      trackingId,
    });
    res.status(201).json({
      id: lead._id,
      trackingId: lead.trackingId,
      message: "Thank you — we will be in touch shortly.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not save your request." });
  }
});

router.get("/status/:trackingId", async (req, res) => {
  try {
    const lead = await Lead.findOne({ trackingId: req.params.trackingId }).lean();
    if (!lead) {
      return res.status(404).json({ error: "Invalid tracking ID." });
    }
    // Return only non-sensitive info
    res.json({
      name: lead.name,
      projectType: lead.projectType,
      projectStatus: lead.projectStatus,
      projectUpdate: lead.projectUpdate,
      createdAt: lead.createdAt,
      updatedAt: lead.updatedAt,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not fetch status." });
  }
});

module.exports = router;
