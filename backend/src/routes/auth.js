const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const { fetchAdminConfig } = require("../utils/adminConfig");

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
});

router.post("/login", loginLimiter, async (req, res) => {
  try {
    const { email, password } = req.body || {};
    const jwtSecret = process.env.JWT_SECRET || "4f7b6a9c2d8e5f1a3b0c4d9e8f7a6b5c";

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required." });
    }

    const adminConfig = await fetchAdminConfig();
    const isEmailMatch = String(email).toLowerCase() === String(adminConfig.email).toLowerCase();
    const passwordMatches = await bcrypt.compare(String(password), adminConfig.passwordHash);

    if (!isEmailMatch || !passwordMatches) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const token = jwt.sign(
      { role: "admin", email: adminConfig.email },
      jwtSecret,
      { expiresIn: "7d" }
    );
    const isProd = process.env.NODE_ENV === "production";
    res.cookie("admin_token", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed." });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("admin_token", { path: "/" });
  res.json({ ok: true });
});

router.get("/me", (req, res) => {
  const token = req.cookies?.admin_token;
  if (!token) {
    return res.status(401).json({ authenticated: false });
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload.role !== "admin") {
      return res.status(401).json({ authenticated: false });
    }
    res.json({ authenticated: true, email: payload.email });
  } catch {
    return res.status(401).json({ authenticated: false });
  }
});

module.exports = router;
