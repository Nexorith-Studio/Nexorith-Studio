const express = require("express");
const Project = require("../models/Project");
const { requireAdmin } = require("../middleware/auth");

const router = express.Router();

router.use(requireAdmin);

router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ _id: -1 }).lean();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: "Failed to load projects." });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, ai_summary, isFeatured } = req.body;
    if (!title || !ai_summary) {
      return res.status(400).json({ error: "Title and AI Summary are required." });
    }
    const project = await Project.create({ title, ai_summary, isFeatured: Boolean(isFeatured) });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: "Failed to create project." });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { title, ai_summary, isFeatured } = req.body;
    if (!title || !ai_summary) {
      return res.status(400).json({ error: "Title and AI Summary are required." });
    }
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { title, ai_summary, isFeatured: Boolean(isFeatured) },
      { new: true }
    );
    if (!project) return res.status(404).json({ error: "Not found." });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: "Failed to update project." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete project." });
  }
});

module.exports = router;
