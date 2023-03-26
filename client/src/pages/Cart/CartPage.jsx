import { Paper, Grid, Stack, Divider } from "@mui/material";
import React from "react";
import MediaCard from "./MediaCard";
import MediaHeader from "./MediaHeader";
import SummaryPage from "./SummaryPage";
import { CartContext } from "../../context/CartContext";

const CartPage = () => {
  const { cart } = React.useContext(CartContext);
  // console.log(cart);
  function CartItem() {
    let out = [];
    if (cart !== {}) {
      for (let [key, value] of Object.entries(cart)) {
        out.push(
          <>
            <MediaCard data={value} key={key} />
          </>
        );
      }
    } else {
    out.push(<MediaCard imgUrl={""} key={0} />);
    }
    return out;
  }

  return (
    <>
      <p
        style={{
          fontFamily: ["Titillium Web", "sans-serif"],
          fontSize: "2.5em",
        }}
      >
        Cart
      </p>

      <Grid container spacing={2}>
        <Grid item xs={9}>
          <Paper elevation={1} sx={{ p: 2, minHeight: "500px" }}>
            <Stack direction={"column"} spacing={2}>
              <MediaHeader />
              <Divider />
              <CartItem />
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper elevation={1} sx={{ p: 2, height: "500px" }}>
            <SummaryPage />
          </Paper>
        </Grid>
      </Grid>

      <p
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
      </Paper>
    </>
  );
};

export default CartPage;
