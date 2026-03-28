const express = require("express");
const Lead = require("../models/Lead");
const { requireAdmin } = require("../middleware/auth");

const router = express.Router();

router.use(requireAdmin);

router.get("/leads", async (req, res) => {
  try {
    const sort = req.query.sort === "oldest" ? 1 : -1;
    const leads = await Lead.find().sort({ createdAt: sort }).lean();
    res.json(leads);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not load leads." });
  }
});

router.patch("/leads/:id", async (req, res) => {
  try {
    const { contacted } = req.body || {};
    if (typeof contacted !== "boolean") {
      return res.status(400).json({ error: "contacted must be a boolean." });
    }
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { contacted },
      { new: true }
    );
    if (!lead) {
      return res.status(404).json({ error: "Not found." });
    }
    res.json(lead);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not update lead." });
  }
});

router.delete("/leads/:id", async (req, res) => {
  try {
    const result = await Lead.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ error: "Not found." });
    }
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not delete lead." });
  }
});

module.exports = router;
