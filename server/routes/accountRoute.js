const express = require("express");
const router = express.Router();
const userModel = require("../config/database");
const passport = require("passport");
const { hashSync, compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");

router.all("/", (req, res) => {
  res.send("account route");
});

router.post("/getuser", (req, res) => {
  console.log(req.user);
  userModel
    .findOne({ _id: req.user._id })
    .then((d) => {
      res.status(200).send({
        success: true,
        message: "Logged in successfully!",
        user: {
          ...d.toJSON(),
          ["password"]: null,
          ["__v"]: null,
        },
      });
    })
    .catch((e) => {
      console.log(e);
    });
});

module.exports = router;
