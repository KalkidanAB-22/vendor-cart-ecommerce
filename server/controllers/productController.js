const pool = require("../db");

// ==========================
// GET ALL PRODUCTS
// ==========================

exports.getProducts = async (req, res) => {
  try {
    const search = req.query.search || "";

    const result = await pool.query(
      `
      SELECT

      products.*,

      categories.name AS category_name


      FROM products


      LEFT JOIN categories

      ON products.category_id = categories.id


      WHERE products.name ILIKE $1


      ORDER BY products.id ASC
      `,
      [`%${search}%`],
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Products fetch error:", error);

    res.status(500).json({
      message: "Unable to fetch products",
    });
  }
};

// ==========================
// GET SINGLE PRODUCT
// ==========================

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      SELECT

      products.*,

      categories.name AS category_name


      FROM products


      LEFT JOIN categories

      ON categories.id = products.category_id


      WHERE products.id=$1
      `,
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Unable to fetch product",
    });
  }
};

// ==========================
// CREATE PRODUCT
// ==========================

exports.createProduct = async (req, res) => {
  const { name, price, description, category_id, sku, brand, stock } = req.body;

  const image_url = req.file ? req.file.path : req.body.image_url;

  try {
    const result = await pool.query(
      `
      INSERT INTO products
      (
        name,
        price,
        description,
        image_url,
        category_id,
        sku,
        brand,
        stock,
        active,
        slug
      )

      VALUES
      ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)

      RETURNING *
      `,
      [
        name,
        price,
        description,
        image_url,
        category_id,
        sku,
        brand,
        stock || 0,
        true,
        name.toLowerCase().replace(/\s+/g, "-"),
      ],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Create product error:", error);

    res.status(500).json({
      message: "Failed to create product",
    });
  }
};

// ==========================
// UPDATE PRODUCT
// ==========================

exports.updateProduct = async (req, res) => {
  const { id } = req.params;

  const {
    name,
    price,
    description,
    image_url,
    category_id,
    sku,
    brand,
    stock,
  } = req.body;

  try {
    const result = await pool.query(
      `
UPDATE products

SET

name=$1,
price=$2,
description=$3,
image_url=$4,
category_id=$5,
sku=$6,
brand=$7,
stock=$8,
updated_at=NOW()


WHERE id=$9


RETURNING *
`,
      [name, price, description, image_url, category_id, sku, brand, stock, id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Unable to update product",
    });
  }
};

// ==========================
// DELETE PRODUCT
// ==========================

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
DELETE FROM products

WHERE id=$1

RETURNING *
`,
      [id],
    );

    if (result.rows.length === 0) {
      throw new AppError("Product not found", 404);
    }

    res.json({
      message: "Product deleted",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Unable to delete product",
    });
  }
};

// ==========================
// FEATURE TOGGLE
// ==========================

exports.toggleFeatured = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
UPDATE products

SET featured = NOT featured

WHERE id=$1

RETURNING *
`,
      [id],
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Unable to update feature",
    });
  }
};

// ==========================
// STATUS TOGGLE
// ==========================

exports.toggleStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
UPDATE products

SET active = NOT active

WHERE id=$1

RETURNING *
`,
      [id],
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Unable to update status",
    });
  }
};
