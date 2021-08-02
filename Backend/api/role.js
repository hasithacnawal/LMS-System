const express = require("express");
const db = require("../models");
const router = express.Router();

const Role = db.Role;

router.post("/", async (req, res) => {
  const { name } = req.body;

  try {
    const role = await Role.create({ role: name });
    return res.json(role);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  const roles = await Role.findAll();
  res.json(roles);
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;

  Role.update(req.body, {
    where: { id: id },
  }).then(() => {
    res.status(200).send("updated successfully a role with id = " + id);
  });
});

module.exports = router;
