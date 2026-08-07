const bcrypt = require("bcrypt");
const pool = require("../db");
const generateToken = require("../utils/generateToken");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);

    if (existing.rows.length) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users
        (name,email,password_hash,role)

        VALUES($1,$2,$3,$4)

        RETURNING id,name,email,role`,

      [name, email, hashedPassword, "customer"],
    );

    const user = result.rows[0];

    const token = generateToken(user);

    res.json({
      token,

      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      "SELECT * FROM users WHERE email=$1",

      [email],
    );

    if (!result.rows.length) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const user = result.rows[0];

    const valid = await bcrypt.compare(password, user.password_hash);

    if (!valid) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = generateToken(user);

    res.json({
      token,

      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
