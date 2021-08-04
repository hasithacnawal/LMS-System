const express = require("express");
const db = require("../models");
const router = express.Router();

const Journal = db.Journal;

router.post("/", async (req, res) => {
  const { title, img, type, file, description, createrId } = req.body;
  const journal = await Journal.create({
    title,
    img,
    type,
    file,
    description,
    createrId,
  });
  return res.json(journal);
});
router.get("/", function (req, res) {
  Journal.findAll({
    include: [
      {
        model: db.User,
        as: "Creater",
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

module.exports = router;
