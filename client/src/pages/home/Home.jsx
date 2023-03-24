import React from "react";
import CarouselMenu from "./CarouselMenu";
import Grid from "@mui/material/Grid";
import CardHome from "./CardHome";
import Notification from "../../components/Notification";
import CategoryCard from "./CategoryCard";
import axios from "axios";
import axiosConfig from "../../utilities/axiosConfig";

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

// var Carousel_items = [
//   {
//     name: "Random Name #2",
//     description: "Hello World!",
//     imgsrc:
//       "https://www.audi.in/content/dam/nemo/in/3_O-Homepage/E-tronHub-3840X4000.jpg?imwidth=1920",
//   },
//   {
//     name: "Random Name #2",
//     description: "Hello World!",
//     imgsrc:
//       "https://www.bmw-evmautokraft.in/sites/default/files/sliders/x1_desktop_offer.png",
//   },
//   {
//     name: "Random Name #2",
//     description: "Hello World!",
//     imgsrc:
//       "https://www.bmw-evmautokraft.in/sites/default/files/sliders/1680x756_5.jpeg",
//   },
//   {
//     name: "Random Name #2",
//     description: "Hello World!",
//     imgsrc:
//       "https://www.bmw-evmautokraft.in/sites/default/files/sliders/3gl_desktop.png",
//   },
//   {
//     name: "Random Name #2",
//     description: "Hello World!",
//     imgsrc:
//       "https://www.bmw-evmautokraft.in/sites/default/files/sliders/m340i.jpg",
//   },
// ];

const Home = () => {
  const [carsCategory, setCarsCategory] = React.useState([]);
  const [carouselList, setCarouselList] = React.useState([]);
  const [newArrivals, setNewArrivals] = React.useState([]);

  React.useEffect(() => {
    axios
      .post(window.serverUrl + "/api/cars/getcategory", {}, axiosConfig)
      .then((d) => {
        setCarsCategory(d.data);
      })
      .catch((e) => {
        console.log(e);
      });

    axios
      .post(window.serverUrl + "/api/cars/getcarousel", {}, axiosConfig)
      .then((d) => {
        setCarouselList(d.data);
      })
      .catch((e) => {
        console.log(e);
      });

    axios
      .post(window.serverUrl + "/api/cars/getnewarrival", {}, axiosConfig)
      .then((d) => {
        setNewArrivals(d.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <>
      <Notification />
      <CarouselMenu items={carouselList} />
      <p
        style={{
          fontFamily: ["Titillium Web", "sans-serif"],
          fontSize: "2em",
        }}
      >
        Series
      </p>

      <Grid container spacing={2} sx={{ mx: "auto" }}>
        {carsCategory.map((d, i) => {
          return (
            <Grid item xs={3} key={i}>
              <CategoryCard data={d} />
            </Grid>
          );
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
        {newArrivals.map((d, i) => {
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

export default Home;
