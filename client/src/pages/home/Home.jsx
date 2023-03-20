import React from "react";
import CarouselMenu from "./CarouselMenu";
import Grid from "@mui/material/Grid";
import CardHome from "./CardHome";
import Footer from "../../components/Footer";

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
  ],
};

const Home = () => {
  return (
    <>
      <CarouselMenu />
      <p
        style={{
          fontFamily: ["Titillium Web", "sans-serif"],
          fontSize: "2em",
        }}
      >
        Series
      </p>

      <Grid container spacing={2} sx={{ mx: "auto" }}>
        {seriesdb.series.map((d, i) => {
          return (
            <Grid item xs={3} key={i}>
              <CardHome data={d}/>
            </Grid>
          )
        })}
      </Grid>

      <p
        style={{
          fontFamily: ["Titillium Web", "sans-serif"],
          fontSize: "2em",
        }}
      >
        New Arrivals
      </p>

      <Grid container spacing={2} sx={{ mx: "auto" }}>
        {seriesdb.series.map((d, i) => {
          return (
            <Grid item xs={3} key={i}>
              <CardHome data={d}/>
            </Grid>
          )
        })}
      </Grid>

        <Footer/>
    </>
  );
};

export default Home;
