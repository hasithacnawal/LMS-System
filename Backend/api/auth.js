const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const db = require("../models");
require("dotenv").config();

const User = db.User;
const Role = db.Role;

router.post("/", async (req, res) => {
  const { firstName, lastName, email, password, phone, roleId } = req.body;
  await User.create({
    firstName,
    lastName,
    phone,
    email,
    password,
    roleId,
  })
    .then((value) =>
      res.status(201).json({
        message: "Account Has Created Successfully",
        status: res.statusCode,
      })
    )
    .catch((err) =>
      res.status(404).json({
        message: "Something went wrong",
        status: res.statusCode,
      })
    );
});
router.put("/changePassword/:id", async (req, res) => {
  const { id } = req.params;
  const { oldPassword, password } = req.body;

  await User.findByPk(id)
    .then((value) => {
      const dbPassword = value.getDataValue("password");
      bcrypt.compare(oldPassword, dbPassword, function (err, result) {
        if (result) {
          bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
              User.update(
                { password: hash },
                {
                  where: { id: value.id },
                }
              );
              res.status(200).json({
                message: "Password Changed",
              });
            });
          });
        } else {
          res.status(401).json({
            message: "Enter your correct current password",
            status: res.statusCode,
          });
        }
      });
    })
    .catch((err) => {
      res.status(404).send();
    });
});
router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: [
      {
        model: db.Role,
        as: "role",
        attributes: ["id", "role"],
      },
    ],
  });
  res.json(users);
});

router.post("/signup", function (req, res) {
  const { firstName, lastName, email, password, phone, roleId } = req.body;
  if (
    password == undefined ||
    password == "" ||
    email == undefined ||
    email == ""
  ) {
    res.status(401).json({
      message: "Fill Required Fields",
      status: res.statusCode,
    });
  } else {
    User.findOne({
      where: {
        email,
      },
    }).then((value) => {
      if (value === null) {
        //HASH THE PASSWORD
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(password, salt, function (err, hash) {
            // CRETAE RECORD IN DB
            User.create({
              firstName,
              lastName,
              phone,
              email,
              roleId,
              password: hash,
            })
              .then((value) =>
                res.status(201).json({
                  message: "Account Has Created Successfully",
                  status: res.statusCode,
                })
              )
              .catch((err) =>
                res.status(404).json({
                  message: "Something went wrong",
                  status: res.statusCode,
                })
              );
          });
        });
      } else {
        res.status(401).json({
          message: "Email already Taken",
          status: res.statusCode,
        });
      }
    });
  }
});
router.post("/login", function (req, res) {
  const { email, password } = req.body;
  if (
    password == "" ||
    password == undefined ||
    email == "" ||
    email == undefined
  ) {
    res.status(401).json({
      message: "Fill All Fields",
      status: res.statusCode,
    });
  } else {
    // check mail in db or not

    User.findOne({
      include: [
        {
          model: Role,
          as: "role",
          attributes: ["id", "role"],
        },
      ],
      where: {
        email,
      },
    }).then((value) => {
      if (value === null) {
        res.status(401).json({
          message: "Email is not Registered Please SignUp",
          status: res.statusCode,
          authenticationToken: "",
        });
      } else {
        // if mail is there check the password is correct or wrong
        const dbPassword = value.getDataValue("password");

        const userDetail = {
          email: value.getDataValue("email"),
          id: value.getDataValue("id"),
        };

        bcrypt.compare(password, dbPassword, function (err, result) {
          if (result) {
            const authenticationToken = JWT.sign(
              userDetail,
              process.env.JWTSecret,
              {
                expiresIn: "90s",
              }
            );
            res.status(200).json({
              message: "Logged In successfully",
              status: res.statusCode,
              authenticationToken,
              value,
            });
          } else {
            res.status(401).json({
              message: "Invalid Crendential given",
              status: res.statusCode,
              authenticationToken: "",
            });
          }
        });
      }
    });
  }
});

module.exports = router;
