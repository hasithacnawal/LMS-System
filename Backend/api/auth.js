const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const db = require("../models");
require("dotenv").config();

const User = db.User;
const Role = db.Role;

router.post("/signup", function (req, res) {
  const { firstName, lastName, userName, email, password, roleId } = req.body;
  if (
    userName == undefined ||
    userName == "" ||
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
      attributes: ["userName"],
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
              userName,
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
