const pool = require("../db");

// GET INVENTORY

exports.getInventory = async (req, res) => {
  try {
    const result = await pool.query(`

SELECT

inventory.id,

inventory.quantity,

products.name,

products.price

FROM inventory

JOIN products

ON inventory.product_id = products.id

ORDER BY inventory.id DESC

`);

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Unable to fetch inventory",
    });
  }
};

// UPDATE STOCK

exports.updateStock = async (req, res) => {
  try {
    const { id } = req.params;

    const { quantity } = req.body;

    const result = await pool.query(
      `

UPDATE inventory

SET

quantity=$1,

updated_at=NOW()

WHERE id=$2

RETURNING *

`,
      [quantity, id],
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Unable to update stock",
    });
  }
};
