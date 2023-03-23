const express = require("express");
const router = express.Router();
const userModel = require("../config/database");
const passport = require("passport");
const { hashSync, compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");

router.all("/", (req, res) => {
  res.send("auth route");
});

router.post('/checkmail',(req,res)=>{
  userModel.findOne({ email:req.body.email},{_id:1})
  .then((d)=>{
    res.status(200).send(d)
  })
  .catch((e)=>{console.log(e)})
})

router.post("/register", (req, res) => {
  const user = new userModel({
    email: req.body.email,
    password: hashSync(req.body.password, 10),
    firstName:req.body.firstName,
    lastName:req.body.lastName,
  });
  
  user
    .save()
    .then((user) => {
      res.status(200).send({
        success: true,
      });
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send({
        success: false,
      });
    });
});

router.post("/login", async (req, res) => {
  await userModel
    .findOne({ email: req.body.email })
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
        email: user.email,
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
