import { Box, Grid, Paper, Typography, Rating, Stack } from "@mui/material";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import React from "react";
import { useState } from "react";
import CardHome from "../home/CardHome";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ProductSpec from "./ProductSpec";

const product = {
  name: "Vehicle",
  imgurl:
    "https://www.bmw-evmautokraft.in/sites/default/files/sliders/x1_desktop_offer.png",
};

const Product = () => {
  const [alignment, setAlignment] = useState("left");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <>
      <p
        style={{
          fontFamily: ["Titillium Web", "sans-serif"],
          fontSize: "2.5em",
        }}
      >
        Vehicle name
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
              src={product.imgurl}
              alt={product.name}
              sx={{
                width: "95%",
                m: "2.5%",
                borderRadius: 1,
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
                fontStyle: "normal",
                marginBottom: "0.5em",
              }}
            >
              Vehicle name
            </p>
            <Stack direction={"row"} sx={{ alignItems: "center" }}>
              <Typography variant="body">Rating :</Typography>
              <Rating
                name="rating"
                precision={0.25}
                value={3.25}
                size="small"
                readOnly
              />
            </Stack>
            <Stack direction={"row"} sx={{ alignItems: "center" }}>
              <Typography variant="body">Sold by :</Typography>
              <Typography variant="body">xyz abc</Typography>
            </Stack>
            <Typography variant="h6">Specifications</Typography>

            <ToggleButtonGroup
              value={alignment}
              exclusive
              onChange={handleAlignment}
              aria-label="text alignment"
            >
              <ToggleButton value="left" aria-label="left aligned">
                <TimeToLeaveIcon />
              </ToggleButton>
              <ToggleButton value="center" aria-label="centered">
                <TimeToLeaveIcon color="success" />
              </ToggleButton>
              <ToggleButton value="right" aria-label="right aligned">
                <TimeToLeaveIcon color="action" />
              </ToggleButton>
              <ToggleButton value="right" aria-label="right aligned">
                <TimeToLeaveIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>
        <Paper sx={{mt:1}}>
          <ProductSpec/>
        </Paper>
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
        {seriesdb.series.map((d, i) => {
          return (
            <Grid item xs={3} key={i}>
              <CardHome data={d} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
const seriesdb = {
  series: [
    {
      url: "https://media.tenor.com/78yYgk4Vb4MAAAAC/lamborghini.gif",
      title: "Lizard",
      desc: "Lorem Ipsum",
    },
    {
      url: "https://media.tenor.com/QfzQwc5_BnUAAAAC/lamborghini-aventador.gif",
      title: "Lizard",
      desc: "Lorem Ipsum",
    },
    {
      url: "https://media.tenor.com/6nm5RZjZx04AAAAC/lamborghini-huracan-lambo.gif",
      title: "Lizard",
      desc: "Lorem Ipsum",
    },
    {
      url: "https://media.tenor.com/i-yDF78jlOoAAAAC/audi-automobile-manufacturer.gif",
      title: "Lizard",
      desc: "Lorem Ipsum",
    },
    {
      url: "https://media.tenor.com/14meTPGyoNoAAAAd/audi.gif",
      title: "Lizard",
      desc: "Lorem Ipsum",
    },
    {
      url: "https://i.pinimg.com/originals/32/37/45/323745d3eb7a804f3ca63ea8884c7598.gif",
      title: "Lizard",
      desc: "Lorem Ipsum",
    },
    {
      url: "https://media.tenor.com/i-yDF78jlOoAAAAC/audi-automobile-manufacturer.gif",
      title: "Lizard",
      desc: "Lorem Ipsum",
    },
    {
      url: "https://media.tenor.com/14meTPGyoNoAAAAd/audi.gif",
      title: "Lizard",
      desc: "Lorem Ipsum",
    },
    {
      url: "https://i.pinimg.com/originals/32/37/45/323745d3eb7a804f3ca63ea8884c7598.gif",
      title: "Lizard",
      desc: "Lorem Ipsum",
    },
  ],
};
export default Product;
