const jwt = require("jsonwebtoken");

function requireAdmin(req, res, next) {
  const token = req.cookies?.admin_token;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload.role !== "admin") {
      return res.status(403).json({ error: "Forbidden" });
    }
    req.admin = { email: payload.email };
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired session" });
  }
}

module.exports = { requireAdmin };
