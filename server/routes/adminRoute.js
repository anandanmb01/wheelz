const express = require("express");
const router = express.Router();
const {
  userModel,
  carCategoryModel,
  carouselModel,
  carModel,
  couponModel,
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
  carouselModel
    .deleteOne({ _id: req.body._id })
    .exec()
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
  carouselModel
    .updateOne({ _id: req.body._id }, req.body)
    .exec()
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
  carCategoryModel
    .deleteOne({ _id: req.body._id })
    .exec()
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
  carCategoryModel
    .updateOne({ _id: req.body._id }, req.body)
    .exec()
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

router.post("/listcoupons", (req, res) => {
  couponModel
    .find({})
    .then((d) => {
      res.json(d);
    })
    .catch((err) => {});
});

router.post("/registercoupon", (req, res) => {
  let coupon = new couponModel({
    name: req.body.name,
    fun: req.body.fun,
  });
  coupon
    .save()
    .then((d) => {
      res.json(d);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/updatecoupon", (req, res) => {
  couponModel
    .updateOne(
      { _id: req.body._id },
      { name: req.body.name, fun: req.body.fun }
    )
    .then((d) => {
      res.json(d);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/deletecoupon", (req, res) => {
  couponModel
    .deleteOne({ _id: req.body._id })
    .then((d) => {
      res.json(d);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/getcoupon", (req, res) => {
  couponModel
    .findOne({ name: req.body.name })
    .then((d) => {
      console.log(d);
      if (!d) {
        res.json(null);
      } else {
        let out = eval(d.fun);
        if (out) {
          res.json({ _id: d._id, name: d.name, discount: out });
        } else {
          res.json(null);
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

// "(()=>{return(1)})();"
module.exports = router;
