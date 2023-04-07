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

const calculateTotal = (cart) => {
  let out = 0;
  for (let item in cart) {
    let obj = cart[item];
    out += (obj.price - obj.price * obj.discount * 0.01) * obj.order.count;
  }
  return out;
};

const SummaryPage = () => {
  const { setNotificationProp } = React.useContext(NotificationPropContext);
  const [coupenList, setCoupenList] = React.useState([]);
  const { cart } = React.useContext(CartContext);
  let price = calculateTotal(cart);
  let discount = calculateTotal(cart) * 0.05;
  let localAmount = price + discount;
  let coupenprice = 0;
  const [coupenCode, setCoupenCode] = React.useState("");

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
            {`${discount} ₹`}
          </Typography>
        </Stack>
        <Divider />
        {/* <Stack direction={"row"} justifyContent={"space-between"} px={2} py={1}>
          <Typography variant="h6"  component={"span"}>
            Coupen code :
          </Typography>
          <Typography variant="h6"  component={"span"} sx={{ fontWeight: "bold" }}>
            5000$
          </Typography>
        </Stack> */}
        <Stack direction={"row"} justifyContent={"space-between"} px={2} py={1}>
          <Typography variant="h6" component={"span"}>
            Discount price :
          </Typography>
          <Typography
            variant="h6"
            component={"span"}
            sx={{ fontWeight: "bold", color: "green" }}
          >
            {`-${coupenprice} ₹`}
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
          <Button variant="outlined">checkout</Button>

          {/*  */}

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
                return <CouponCard key={i} data={d} cl={setCoupenList}/>
              })}
            </Stack>

          </Stack>

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

          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default SummaryPage;
