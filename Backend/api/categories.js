const express = require("express");
const db = require("../models");
const router = express.Router();

const Category = db.Category;

router.post("/", async (req, res) => {
  const { name } = req.body;

  try {
    const category = await Category.create({ name });
    return res.json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  const categories = await Category.findAll({
    attributes: ["id", "name"],
  });
  res.json(categories);
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;

  await Category.update(req.body, {
    where: { id: id },
  }).then(() => {
    res.status(200).send("updated successfully a category with id = " + id);
  });
});

module.exports = router;
