const express = require("express");
const db = require("../models");
const router = express.Router();

const Book = db.Book;

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
  const book = await Book.create(
    {
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
    },
    {
      include: [
        {
          association: db.Book.belongsTo(db.Category),
        },
      ],
    }
  );
  return res.json(book);
});

module.exports = router;
