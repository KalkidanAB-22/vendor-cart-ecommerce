const pool = require("../db");

// GET ALL CATEGORIES
exports.getCategories = async (req, res) => {
  try {
    const result = await pool.query(
      `
            SELECT *
            FROM categories
            ORDER BY id ASC
            `,
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch categories",
    });
  }
};

// CREATE CATEGORY (ADMIN)
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Category name required",
      });
    }

    const result = await pool.query(
      `
            INSERT INTO categories(name)

            VALUES($1)

            RETURNING *
            `,

      [name],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create category",
    });
  }
};

// DELETE CATEGORY (ADMIN)
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      `
            DELETE FROM categories
            WHERE id=$1
            `,

      [id],
    );

    res.json({
      message: "Category deleted",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete category",
    });
  }
};
