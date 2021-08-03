const express = require("express");
const db = require("../models");
const router = express.Router();

const Journal = db.Journal;

router.post("/", async (req, res) => {
  const {
    title,
    img,
    type,
    year,
    description,
    stockCount,
    authorId,
    author,
    category,
    createrId,
  } = req.body;
  const journal = await Journal.create({
    title,
    img,
    type,
    year,
    description,
    stockCount,
    createrId,
    authorId,
    author,
    category,
  });
  return res.json(journal);
});

module.exports = router;
