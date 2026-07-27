const express = require("express");
const Service = require("../models/Service");
const { requireAdmin } = require("../middleware/auth");

const router = express.Router();

router.use(requireAdmin);

router.get("/", async (req, res) => {
  try {
    const services = await Service.find().sort({ _id: -1 }).lean();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: "Failed to load services." });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, ai_summary, isActive } = req.body;
    if (!name || !ai_summary) {
      return res.status(400).json({ error: "Name and AI Summary are required." });
    }
    const service = await Service.create({ name, ai_summary, isActive: Boolean(isActive) });
    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ error: "Failed to create service." });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { name, ai_summary, isActive } = req.body;
    if (!name || !ai_summary) {
      return res.status(400).json({ error: "Name and AI Summary are required." });
    }
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { name, ai_summary, isActive: Boolean(isActive) },
      { new: true }
    );
    if (!service) return res.status(404).json({ error: "Not found." });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: "Failed to update service." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete service." });
  }
});

module.exports = router;
