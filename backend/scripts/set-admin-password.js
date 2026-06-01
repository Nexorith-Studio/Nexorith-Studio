#!/usr/bin/env node
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { saveAdminPasswordHash } = require('../src/utils/adminConfig');

const pwd = process.argv[2] || 'password123';
(async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nexorith';
    await mongoose.connect(uri);
    const hash = await bcrypt.hash(pwd, 12);
    const res = await saveAdminPasswordHash(hash);
    console.log('Admin password updated for', res.email);
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
