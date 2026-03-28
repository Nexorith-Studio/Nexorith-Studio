/**
 * Usage: node scripts/hash-password.js "your-secure-password"
 * Copy the hash into ADMIN_PASSWORD_HASH in .env
 */
const bcrypt = require("bcryptjs");

const pwd = process.argv[2];
if (!pwd) {
  console.error('Usage: node scripts/hash-password.js "your-password"');
  process.exit(1);
}

bcrypt.hash(pwd, 12).then((hash) => {
  console.log(hash);
});
