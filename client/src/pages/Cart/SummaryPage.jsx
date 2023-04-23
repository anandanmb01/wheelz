import React from "react";
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import { CartContext } from "../../context/CartContext";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CouponCard from "./CouponCard";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import axios from "axios";
import axiosConfig from "../../utilities/axiosConfig";
import { NotificationPropContext } from "../../context/NotificationPropContext";
import { useNavigate } from "react-router-dom";

const calculateTotal = (cart) => {
  let out = 0;
  for (let item in cart) {
    let obj = cart[item];
    out += (obj.price - obj.price * obj.discount * 0.01) * obj.order.count;
  }
  return out;
};

const calculateDiscount = (coupenList) => {
  let out = 0;
  coupenList.map((t) => {
    out += (t.discount * -0.01);
    return null;
  })
  return out;
}


const SummaryPage = (props) => {
  const [loading, setLoading] = React.useState(true);
  const { setNotificationProp } = React.useContext(NotificationPropContext);
  const [coupenList, setCoupenList] = React.useState([]);
  const { cart } = React.useContext(CartContext);
  const [coupenCode, setCoupenCode] = React.useState("");
  const navigator = useNavigate();
  let price = calculateTotal(cart);
  let tax = calculateTotal(cart) * 0.05;
  let coupenprice = calculateDiscount(coupenList) * price;
  let localAmount = price + tax + coupenprice;


  let res = {
    cart: [],
    coupen: [],
    address: props.address,
  }


  function loadRazorpay() {


    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onerror = () => {


      setNotificationProp({
        open_: true,
        severity: "error",
        message: "Razorpay SDK failed to load. Are you online?",
      });
    };
    script.onload = async () => {
      try {
        setLoading(true);


        const result = await axios.post(window.serverUrl + '/api/payment/createOrder', res, axiosConfig)

        const { amount, id: order_id, currency } = result.data;
        const {
          data: { key: razorpayKey },
        } = await axios.post(window.serverUrl + '/api/payment/getRazorpayKey');

        const options = {
          key: razorpayKey,
          amount: amount,
          currency: currency,
          name: 'Wheelz',
          description: 'Wheelz payment portal powered by razopay',
          order_id: order_id,
          handler: async function (response) {
            const result = await axios.post(window.serverUrl + '/api/payment/payOrder', {
              amount: amount,
              planId: props.data.planId,
              // hub: hubSelect,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            });
            // setAlert(result.data.msg);
            props.setPaymentPlan(false);
            window.location.reload(false);
          },
          prefill: {
            name: 'example name',
            email: 'email@example.com',
            contact: '111111',
          },
          notes: {
            address: 'example address',
          },
          theme: {
            color: '#80c0f0',
          },
        };

        setLoading(false);
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (err) {
        // setAlert(err);
        setLoading(false);
      }
    };
    document.body.appendChild(script);
  }

  const handleCheckout = () => {
    if (props.checkout) {
      Object.keys(cart).forEach(key => {
        res.cart.push(
          {
            _id: key,
            count: cart[key].order.count,
            color: cart[key].order.color,
          });
      });

      for (let key of coupenList) {
        res.coupen.push(
          {
            _id: key._id,
          });

      }
      console.log(res);


    } else {
      if (JSON.stringify(props.address) === JSON.stringify({})) {
        document.getElementById('billing-address-form').scrollIntoView();

      } else {
        navigator('/checkout')
      }
    }

  }


  const handleCoupenClick = () => {
    axios.post(window.serverUrl + '/api/admin/getcoupon', { name: coupenCode }, axiosConfig).then((d) => {
      if (!d.data) {
        setNotificationProp({
          open_: true,
          severity: "error",
          message: "Coupen code invalid",
        });
      } else {
        let found = false;
        for (var i = 0; i < coupenCode.length; i++) {

          if (JSON.stringify(coupenList[i]) === JSON.stringify(d.data)) {
            found = true;
          }
        }
        if (found) {
          setNotificationProp({
            open_: true,
            severity: "info",
            message: "Coupon Already added",
          });
        } else {
          setCoupenList((t) => { return [...t, d.data] });
          setNotificationProp({
            open_: true,
            severity: "success",
            message: "Coupon Added successfully",
          });
        }

      }
    }).catch((e) => { console.log(e) })

    setCoupenCode("");
  }


  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Typography
          variant="h6"
          gutterBottom={true}
          color={"grey"}
          component={"span"}
          sx={{ fontWeight: "bold" }}
        >
          Summary
        </Typography>
      </Box>
      <Divider />
      <Stack spacing={1} direction="column">
        <Stack direction={"row"} justifyContent={"space-between"} px={2} pt={1}>
          <Typography variant="h6" color={"grey"} component={"span"}>
            Products :
          </Typography>
          <Typography variant="h6" color={"grey"} component={"span"}>
            {`${price} ₹`}
          </Typography>
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"} px={2} py={1}>
          <Typography variant="h6" color={"grey"} component={"span"}>
            Tax [ 5% ]:
          </Typography>
          <Typography variant="h6" color={"grey"} component={"span"}>
            {`${tax} ₹`}
          </Typography>
        </Stack>
        <Divider />
        <Stack direction={"row"} justifyContent={"space-between"} px={2} py={1}>
          <Typography variant="h6" component={"span"}>
            Discount price :
          </Typography>
          <Typography
            variant="h6"
            component={"span"}
            sx={{ fontWeight: "bold", color: "green" }}
          >
            {`${coupenprice} ₹`}
          </Typography>
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"} px={2} py={1}>
          <Typography variant="h6" component={"span"}>
            Total Amount :
          </Typography>
          <Typography
            variant="h6"
            component={"span"}
            sx={{ fontWeight: "bold" }}
          >
            {`${localAmount} ₹`}
          </Typography>
        </Stack>
        <Divider />
        <Stack direction={"column"} spacing={2} pt={2}>
          <Button variant="outlined" onClick={handleCheckout}>{props.checkout ? "buy now" : "checkout"}</Button>

          {/*  */}

          {props.checkout && (coupenList.length > 0) ? <Typography variant="h6" component={"span"} sx={{ visibility: 'visible', color: 'grey', pt: 2 }}>
            Active coupons
          </Typography> : <></>}

          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            px={2}
            py={1}
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" component={"span"} sx={{ visibility: 'hidden' }}>
              Coupon :
            </Typography>
            <Stack direction={'column'} spacing={2}>
              {coupenList.map((d, i) => {
                return <CouponCard checkout={props.checkout} key={i} data={d} cl={setCoupenList} />
              })}
            </Stack>

          </Stack>

          {props.checkout ? <></> : <Stack
            direction={"row"}
            justifyContent={"space-between"}
            px={2}
            py={1}
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" component={"span"}>
              Coupon :
            </Typography>
            <TextField
              id="outlined-basic"
              label="coupen code"
              variant="standard"
              color="success"
              focused
              onChange={(e) => { setCoupenCode(e.target.value) }}
              value={coupenCode}
            />
            {coupenCode !== "" && <IconButton onClick={handleCoupenClick}> <TaskAltIcon fontSize="small" color="success" /> </IconButton>}

          </Stack>}
        </Stack>
      </Stack>
    </>
  );
};

export default SummaryPage;
