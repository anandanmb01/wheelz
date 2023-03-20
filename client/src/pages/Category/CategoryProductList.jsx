import React from "react";
import Grid from "@mui/material/Grid";
import CardHome from "../home/CardHome";
import { Box } from "@mui/material";

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

var Carousel_items = [
  {
    name: "Random Name #2",
    description: "Hello World!",
    imgsrc:
      "https://i.pinimg.com/originals/32/37/45/323745d3eb7a804f3ca63ea8884c7598.gif",
  },
];

const CategoryProductList = () => {
  return (
    <>
      <p
        style={{
          fontFamily: ["Titillium Web", "sans-serif"],
          fontSize: "2.5em",
        }}
      >
        Category Name
      </p>

      <Box
        component={"img"}
        src={Carousel_items[0].imgsrc}
        alt="gif"
        sx={{
          height: { xs: 400, lg: 600 },
          width: "100%",
          objectFit: "cover",
        }}
      ></Box>
      <p
        style={{
          fontFamily: ["Titillium Web", "sans-serif"],
          fontSize: "2em",
        }}
      >
        Products
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

export default CategoryProductList;
