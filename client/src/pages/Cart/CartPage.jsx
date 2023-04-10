import { Paper, Grid, Stack, Divider, Box } from "@mui/material";
import React from "react";
import MediaCard from "./MediaCard";
import MediaHeader from "./MediaHeader";
import SummaryPage from "./SummaryPage";
import { CartContext } from "../../context/CartContext";
import AddressForm from "../../components/Form/AddressForm"


const CartPage = (props) => {
  const { cart } = React.useContext(CartContext);
  const [address, setAddress] = React.useState({})
  // console.log(cart);
  function CartItem() {
    let out = [];
    if (cart !== {}) {
      for (let [key, value] of Object.entries(cart)) {
        out.push(
          <>
            <MediaCard checkout={props?.checkout} data={value} key={key} />
          </>
        );
      }
    } else {
      out.push(<MediaCard checkout={props?.checkout} imgUrl={""} key={0} />);
    }
    return out;
  }
  return (
    <Box id={'cart-page'}>
      <p
        style={{
          fontFamily: ["Titillium Web", "sans-serif"],
          fontSize: "2.5em",
        }}

      >
        {props.checkout?"Summary":"Cart"}
      </p>

      <Grid container spacing={2}>
        <Grid item xs={9}>
          <Paper elevation={props.checkout ? 0 : 1} sx={{ p: 2, minHeight: "500px" }}>
            <Stack direction={"column"} spacing={2} >
              <MediaHeader checkout={props.checkout} />
              <Divider />
              <CartItem />
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper elevation={props.checkout ? 0 : 1} sx={{ p: 2, minHeight: "500px" }}>
            <SummaryPage checkout={props.checkout} address={address} />
          </Paper>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={9}>
          <AddressForm m={2} checkout={props.checkout} address={address} setAddress={setAddress} />
        </Grid>
      </Grid>

      {!props.checkout &&<>    <p
        style={{
          fontFamily: ["Titillium Web", "sans-serif"],
          fontSize: "2em",
          marginTop: "0.8em",
          fontStyle: "normal",
          marginBottom: "0.5em",
        }}
      >
        Previous orders
      </p>

      <Paper elevation={1} sx={{ p: 2, height: "500px" }}>
        abc
      </Paper></>  }
    </Box>
  );
};

export default CartPage;
