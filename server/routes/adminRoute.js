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
  res.send("general route");
});

router.post("/registercarousel", (req, res) => {
  const carousel = new carouselModel({
    name: req.body.name,
    desc: req.body.desc,
    imgUrl: req.body.url,
  });

  carousel
    .save()
    .then((d) => {
      res.status(200).send({
        success: true,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        success: false,
      });
    });
});

router.post("/deletecarousel", (req, res) => {
  carouselModel.deleteOne({ _id: req.body._id }).exec()
  .then((d) => {
    res.status(200).send({
      success: true,
    });
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send({
      success: false,
    });
  });
});

router.post("/updatecarousel", (req, res) => {
  carouselModel.updateOne({ _id: req.body._id },req.body).exec()
  .then((d) => {
    res.status(200).send({
      success: true,
    });
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send({
      success: false,
    });
  });
});



////////

router.post("/registercategory", (req, res) => {
  const carCategory = new carCategoryModel({
    name: req.body.name,
    desc: req.body.desc,
    imgUrl: req.body.imgUrl,
  });
  carCategory
    .save()
    .then((d) => {
      res.status(200).send({
        success: true,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        success: false,
      });
    });
});

router.post("/deletecategory", (req, res) => {
  carCategoryModel.deleteOne({ _id: req.body._id }).exec()
  .then((d) => {
    res.status(200).send({
      success: true,
    });
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send({
      success: false,
    });
  });
});

router.post("/updatecategory", (req, res) => {
  carCategoryModel.updateOne({ _id: req.body._id },req.body).exec()
  .then((d) => {
    res.status(200).send({
      success: true,
    });
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send({
      success: false,
    });
  });
});

module.exports = router;
