const Admin = require("../models/Admin");

const EMERGENCY_EMAIL = "admin@nexorith.io";
const EMERGENCY_HASH = "$2b$12$V3aA/NcP.fW5qGRkrOuVB.40GFepKeUq5VbMiyD3PH7ZQf3IBUWfK";

async function fetchAdminConfig() {
  const record = await Admin.findOne().lean();
  if (record) {
    return record;
  }

  return {
    email: process.env.ADMIN_EMAIL?.toLowerCase() || EMERGENCY_EMAIL,
    passwordHash: process.env.ADMIN_PASSWORD_HASH || EMERGENCY_HASH,
  };
}

async function saveAdminPasswordHash(passwordHash) {
  const email = process.env.ADMIN_EMAIL?.toLowerCase() || EMERGENCY_EMAIL;
  const record = await Admin.findOne();
  if (record) {
    record.passwordHash = passwordHash;
    return record.save();
  }

  return Admin.create({ email, passwordHash });
}

module.exports = { fetchAdminConfig, saveAdminPasswordHash };
