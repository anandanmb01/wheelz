const express = require("express");
const router = express.Router();
const userModel = require("../config/database");
const passport = require("passport");
const { hashSync, compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");

router.all("/", (req, res) => {
  res.send("auth route");
});

router.post("/register", (req, res) => {
  const user = new userModel({
    username: req.body.username,
    password: hashSync(req.body.password, 10),
  });

  user
    .save()
    .then((user) => {
      res.send({
        success: true,
        message: "User created successfully.",
        user: {
          id: user._id,
          username: user.username,
        },
      });
    })
    .catch((err) => {
      res.send({
        success: false,
        message: "Something went wrong",
        error: err,
      });
    });
});

router.post("/login", async (req, res) => {
  await userModel
    .findOne({ username: req.body.username })
    .exec()
    .then((user) => {
      //No user found
      if (!user) {
        return res.status(401).send({
          success: false,
          message: "Could not find the user.",
        });
      }

      //Incorrect password
      if (!compareSync(req.body.password, user.password)) {
        return res.status(401).send({
          success: false,
          message: "Incorrect password",
        });
      }

      const payload = {
        username: user.username,
        id: user._id,
      };

      const token = jwt.sign(payload, process.env.JWT_KEY, {
        expiresIn: "1d",
      });

      return res.status(200).send({
        success: true,
        message: "Logged in successfully!",
        token: "Bearer " + token,
      });
    });
});

router.post(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.status(200).send({
      success: true,
      user: {
        id: req.user._id,
        username: req.user.username,
      },
    });
  }
);

module.exports = router;
