require("dotenv").config();

const bcrypt = require("bcrypt");
const pool = require("./db/database");

async function createAdmin() {
  const password = await bcrypt.hash("admin123", 10);

  await pool.query(
    `
INSERT INTO users
(name,email,password,role)

VALUES($1,$2,$3,$4)

`,

    ["Admin", "admin@shop.com", password, "admin"],
  );

  console.log("Admin created");

  process.exit();
}

createAdmin();
