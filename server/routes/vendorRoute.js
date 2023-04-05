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
  res.send("vendor route");
});

router.post("/registercar", (req, res) => {
  userModel
    .findOne({ _id: req.user._id }, { "vendor.tagName": 1 })
    .then((d) => {
      const car = new carModel({
        ...req.body,
        ["vendor"]: { _id: d._id, tagName: d.vendor.tagName },
      });

      car
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
      // console.log(d.body);
    })

    .catch((e) => {
      console.log(e);
    });
  // carCategoryModel
  //   .find({})
  //   .then((d) => {
  //     res.status(200).send(d);
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //   });
  console.log(req.body);
});

router.post("/searchcar", (req, res) => {
  var regex = new RegExp("^" + req.body.pattern);
  carModel
    .find({ name: { $regex: regex }, "vendor._id": req.user._id })
    .limit(10)
    .then((d) => {
      res.status(200).send(d);
    })
    .catch((e) => {
      console.log(e);
    });
});

router.post("/deletecar", (req, res) => {
  carModel
    .deleteOne({ _id: req.body._id, "vendor._id": req.user._id })
    .then((d) => {
      res.status(200).send({
        success: true,
      });
    })
    .catch((e) => {
      console.log(e);
    });
});



module.exports = router;
