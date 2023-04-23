const express = require("express");
const router = express.Router();
const { userModel, carModel } = require("../config/database");
const passport = require("passport");
const { hashSync, compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");

const Razorpay = require("razorpay");

router.all("/", (req, res) => {
  res.send("payment route");
});

router.all("/check", (req, res) => {
  console.log(req.body);
});

//-----------------------------Plans--------------------------------//

router.post("/getRazorpayKey", (req, res) => {
  res.send({ key: process.env.RAZORPAY_KEY_ID });
});

router.post("/createOrder", async (req, res) => {
  // try {
  //   const instance = new Razorpay({
  //     key_id: process.env.RAZORPAY_KEY_ID,
  //     key_secret: process.env.RAZORPAY_SECRET,
  //   });
  //   const options = {
  //     amount: parseInt(paymentPlans[req.body.planId].amount),
  //     currency: 'INR',
  //   };
  //   // console.log(options)
  //   const order = await instance.orders.create(options);
  //   if (!order) return res.status(500).send('Some error occured');
  //   res.send(order);
  // } catch (error) {
  //   res.status(500).send(error);
  // }
  const calcAmount = async (obj) => {
    let netAmount = 0;
    obj.cart.forEach((element) => {
      await carModel.findOne({ _id: element._id }).then((d) => {
        netAmount =
          netAmount +
          Number(d.price) *
          Number(element.count) *
            (1 - Number(d.discount) * 0.01) *
            (1 + Number(process.env.GOV_TAX) * 0.01);
        // console.log(d);

      });
    });
    console.log(netAmount);
  };

  calcAmount(req.body);
  // console.log(req.body);
});

router.post("/payOrder", async (req, res) => {
  try {
    const { planId, razorpayPaymentId, razorpayOrderId, razorpaySignature } =
      req.body;
    const newOrder = Order({
      // console.log(planId);
      userId: req.user.id,
      isPaid: true,
      date: moment(),
      planId: planId,
      razorpay: {
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,
        signature: razorpaySignature,
      },
    });

    await newOrder.save();

    const cexp = moment(req.user.expiry);
    let lexp = cexp;
    lexp.add(paymentPlans[planId].noOfDays, "day");
    req.user.expiry = lexp;
    await User.updateOne({ id: req.user.id }, { $set: { expiry: lexp } });
    const diff = lexp.diff(moment(), "day");
    await setVpnExp(req.body.hub, req.user.username, diff);

    res.send({
      msg: "Payment was successfull",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post("/listOrders", async (req, res) => {
  const orders = await Order.find({ userId: req.body.id });
  res.send(orders);
});

module.exports = router;
