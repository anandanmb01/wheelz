import { Box, Grid, Paper, Typography, Rating, Stack } from "@mui/material";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import React from "react";
import { useState } from "react";
import CardHome from "../home/CardHome";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ProductSpec from "./ProductSpec";
import { useParams } from "react-router-dom";
import axiosConfig from "../../utilities/axiosConfig";
import axios from "axios";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { NotificationPropContext } from "../../context/NotificationPropContext";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";

const Product = () => {
  const [alignment, setAlignment] = useState("");
  const [car, setCar] = React.useState({});
  const { setNotificationProp } = React.useContext(NotificationPropContext);
  const { authStatus } = React.useContext(AuthContext);
  const [picUrl, setPicUrl] = React.useState("");
  const { cart, setCart } = React.useContext(CartContext);

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const [catCars, setCatCars] = React.useState([]);
  const [color, setColor] = React.useState(null);
  let parms = useParams();

  function handleAddToCart() {
    if (authStatus) {
      if (cart.hasOwnProperty(car._id)) {
        setNotificationProp({
          open_: true,
          severity: "info",
          message: "Item added to cart",
        });
      } else {
        if (color) {
          if (color === "default") {
            setNotificationProp({
              open_: true,
              severity: "info",
              message: "Select product colour",
            });
          } else {
            setCart((t) => {
              return {
                ...t,
                [car._id]: {
                  ...car,
                  order: {
                    count: 1,
                    ["color"]: color,
                  },
                },
              };
            });
          }
        } else {
          setNotificationProp({
            open_: true,
            severity: "info",
            message: "Select product colour",
          });
        }
      }
    } else {
      setNotificationProp({
        open_: true,
        severity: "info",
        message: "Signin to add to cart",
      });
    }
  }

  React.useEffect(() => {
    axios
      .post(
        window.serverUrl + "/api/cars/getcar",
        { _id: parms.productId },
        axiosConfig
      )
      .then((d) => {
        axios
          .post(
            window.serverUrl + "/api/cars/getcategorycars",
            { catId: d.data.catId },
            axiosConfig
          )
          .then((x) => {
            setCatCars(x.data);
            setCar(d.data);
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  }, [parms]);

  const ColourPallet = () => {
    if (car?.imgUrl) {
      const obj = car?.imgUrl;
      // let keys = Object.keys(obj);
      let out = [];
      for (let x in obj) {
        if (x === "default") {
          out.push(
            <ToggleButton
              value="def"
              aria-label="right aligned"
              sx={{ p: 0.7 }}
              key={x}
              onClick={() => {
                setPicUrl(obj[x]);
                setColor("default");
              }}
            >
              <Box
                component={"div"}
                sx={{
                  display: "flex",
                  width: "60px",
                  height: "30px",
                  backgroundColor: "whitesmoke",
                  borderRadius: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TimeToLeaveIcon sx={{ m: 0, p: 0, b: 0 }} />
              </Box>
            </ToggleButton>
          );
        } else {
          out.push(
            <ToggleButton
              value=""
              aria-label="right aligned"
              sx={{ p: 0.7 }}
              key={x}
              onClick={() => {
                setPicUrl(obj[x]);
                setColor(x);
              }}
            >
              <Box
                component={"div"}
                sx={{
                  display: "flex",
                  width: "60px",
                  height: "100%",
                  backgroundColor: x,
                  borderRadius: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: 0.8,
                }}
              >
                <TimeToLeaveIcon sx={{ m: 0, p: 0, b: 0 }} />
              </Box>
            </ToggleButton>
          );
        }
      }
      return out;
    }
  };
  // ColourPallet();

  return (
    <Box>
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link rel="preconnect" href="https://fonts.gstatic.com"></link>
      <link
        href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@300&display=swap"
        rel="stylesheet"
      ></link>

      <p
        style={{
          fontFamily: ["Titillium Web", "sans-serif"],
          fontSize: "2.5em",
          fontStyle: "italic",
        }}
      >
        {car.name}
      </p>
      <Paper
        sx={{
          mt: 2,
        }}
      >
        <Grid container spacing={0}>
          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box
              component={"img"}
              src={picUrl ? picUrl : car?.imgUrl?.default}
              alt={car.name}
              sx={{
                width: "95%",
                m: "2.5%",
                borderRadius: 1,
                height: "432px",
              }}
            ></Box>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              // border: "1px solid black",
              px: 1,
            }}
          >
            <p
              style={{
                fontFamily: ["Titillium Web", "sans-serif"],
                fontSize: "2em",
                marginTop: "0.5em",
                fontStyle: "bold",
                marginBottom: "0.5em",
                fontWeight: 4,
              }}
            >
              {car.name}
            </p>

            <Box sx={{ width: 450, ml: 5, mb: 4 }} spacing={5}>
              <Stack direction={"row"} sx={{ alignItems: "center", m: 1.5 }}>
                <Typography variant="body">Rating :</Typography>
                <Rating
                  name="rating"
                  precision={0.25}
                  value={Number(car.rating)}
                  size="small"
                  readOnly
                  sx={{ pl: 2 }}
                />
              </Stack>
              <Stack direction={"row"} sx={{ alignItems: "center", m: 1.5 }}>
                <Typography variant="body">Sold by :</Typography>
                <Typography variant="body" sx={{ pl: 2 }}>
                  {" "}
                  {car.vendor?.tagName}
                </Typography>
              </Stack>
              <Stack direction={"row"} sx={{ alignItems: "center", m: 1.5 }}>
                <Typography variant="body">Top Speed :</Typography>
                <Typography variant="body" sx={{ pl: 2 }}>
                  {" "}
                  {car.spec?.topSpeed}
                </Typography>
              </Stack>
              <Stack direction={"row"} sx={{ alignItems: "center", m: 1.5 }}>
                <Typography variant="body">Torque :</Typography>
                <Typography variant="body" sx={{ pl: 2 }}>
                  {" "}
                  {car.spec?.torque}
                </Typography>
              </Stack>
              <Stack direction={"row"} sx={{ alignItems: "center", m: 1.5 }}>
                <Typography variant="body">Accleration :</Typography>
                <Typography variant="body" sx={{ pl: 2 }}>
                  {" "}
                  {car.spec?.accleration}
                </Typography>
              </Stack>
              <Stack direction={"row"} sx={{ alignItems: "center", m: 1.5 }}>
                <Typography variant="body">Transmission :</Typography>
                <Typography variant="body" sx={{ pl: 2 }}>
                  {" "}
                  {car.spec?.transmission}
                </Typography>
              </Stack>
            </Box>

            <Stack direction={"row"} sx={{ alignItems: "center", m: 1.5 }}>
              <Typography variant="h6">Price :</Typography>
              <Typography variant="h6" sx={{ pl: 2 }}>
                {" "}
                {car?.price - car?.price * Number(car.discount) * 0.01}
                {" ₹"}
              </Typography>
              <Typography
                variant="caption"
                sx={{ pl: 2, textDecoration: "line-through" }}
              >
                {" "}
                {car?.price}
              </Typography>
            </Stack>

            <Typography variant="h6" sx={{ m: 1 }}>
              Specifications
            </Typography>

            <Stack direction={"row"} justifyContent={"space-between"}>
              <ToggleButtonGroup
                value={alignment}
                exclusive
                onChange={handleAlignment}
                aria-label="text alignment"
              >
                <ColourPallet />
              </ToggleButtonGroup>
              <Button
                variant="outlined"
                sx={{ mr: "50px" }}
                size="small"
                onClick={() => {
                  handleAddToCart();
                }}
              >
                <ShoppingCartIcon /> Add to cart
              </Button>
            </Stack>
          </Grid>
        </Grid>
        {/* <Paper sx={{ mt: 1 }}>
          <ProductSpec />
        </Paper> */}
      </Paper>

      <p
        style={{
          fontFamily: ["Titillium Web", "sans-serif"],
          fontSize: "2em",
        }}
      >
        Similar
      </p>

      <Grid container spacing={2} sx={{ mx: "auto" }}>
        {catCars.map((d, i) => {
          return (
            <Grid item xs={3} key={i}>
              <CardHome data={d} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Product;
