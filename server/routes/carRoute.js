const express = require("express");
const router = express.Router();
const {
  userModel,
  carCategoryModel,
  carouselModel,
  carModel
} = require("../config/database");
const passport = require("passport");
const { hashSync, compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");

router.all("/", (req, res) => {
  res.send("general route");
});

router.post("/getcategory", (req, res) => {
  carCategoryModel
    .find({})
    .then((d) => {
      res.status(200).send(d);
    })
    .catch((e) => {
      console.log(e);
    });
});

router.post("/getcarousel", (req, res) => {
  carouselModel
    .find({})
    .then((d) => {
      res.status(200).send(d);
    })
    .catch((e) => {
      console.log(e);
    });
});

router.post("/getnewarrival", (req, res) => {
  carModel
    .find({newArrival:true}).limit(6)
    .then((d) => {
      res.status(200).send(d);
    })
    .catch((e) => {
      console.log(e);
    });
});


module.exports = router;
