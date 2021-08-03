const express = require("express");
const db = require("../models");
const router = express.Router();

const Book = db.Book;

//post book
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
    categoryId,
  } = req.body;
  const book = await Book.create(
    {
      title,
      img,
      type,
      year,
      description,
      stockCount,
      authorId,
      author,
      categoryId,
      category,
    }
    // {
    //   include: [
    //     {
    //       association: db.Book.belongsTo(db.Category),
    //     },
    //   ],
    // }
  );
  return res.json(book);
});

//get all books
router.get("/", function (req, res) {
  Book.findAll({
    include: [
      {
        model: db.Author,
        attributes: ["id", "name", "country"],
        as: "Author",
      },
      {
        model: db.Category,
        attributes: ["id", "name"],
        as: "Category",
      },
    ],
  })
    .then((value) => {
      res.send(value);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  await Book.findByPk(id, {
    include: [
      {
        model: db.Author,
        as: "Author",
      },
    ],
  });
});

module.exports = router;
