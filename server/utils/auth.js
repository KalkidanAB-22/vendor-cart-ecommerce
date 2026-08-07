const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SALT_ROUNDS = 10;

// --------------------
// Password hashing
// --------------------

async function hashPassword(plainPassword) {
  return bcrypt.hash(plainPassword, SALT_ROUNDS);
}

async function comparePassword(plainPassword, hash) {
  return bcrypt.compare(plainPassword, hash);
}

// --------------------
// JWT signing
// --------------------

function signToken(user) {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    },
  );
}

module.exports = {
  hashPassword,
  comparePassword,
  signToken,
};
