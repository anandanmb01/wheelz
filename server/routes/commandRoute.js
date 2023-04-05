const express = require("express");
const router = express.Router();
const {
  userModel,
  carCategoryModel,
  carouselModel,
  carModel,
} = require("../config/database");
const passport = require("passport");
const { hashSync, compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");

router.all("/", (req, res) => {
  res.send("command route");
});

router.post(
  "/registervendor",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // check if mail is verified
    userModel
      .updateOne({ email: req.user.email }, { vendor: { status: true } })
      .then((d) => {
        req.user.vendor = true;
        res.send("ok");
      })
      .catch((err) => {
        res.sendStatus(401).send(err);
      });
  }
);

router.post(
  "/checkvendor",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req?.user?.vendor) {
      res.status(200).json({
        success: true,
      });
    } else {
      res.status(401).json({
        success: false,
      });
    }
  }
);

router.post(
  "/checkadmin",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req?.user?.admin) {
      res.status(200).json({
        success: true,
      });
    } else {
      res.status(401).json({
        success: false,
      });
    }
  }
);

module.exports = router;
