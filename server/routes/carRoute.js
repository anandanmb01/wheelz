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

router.post("/getcategorycars", (req, res) => {
  carModel
    .find({catId:req.body.catId},{name:1,catId:1,rating:1,vendor:1,imgUrl:1,desc:1,price:1,discount:1}).limit(6)
    .then((d) => {
      res.status(200).send(d);
    })
    .catch((e) => {
      console.log(e);
    });
});

router.post("/getcar", (req, res) => {
  carModel
    .findOne({_id:req.body._id})
    .then((d) => {
      res.status(200).send(d);
    })
    .catch((e) => {
      console.log(e);
    });
});

module.exports = router;
