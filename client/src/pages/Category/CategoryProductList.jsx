import React from "react";
import Grid from "@mui/material/Grid";
import CardHome from "../home/CardHome";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
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

const CategoryProductList = (props) => {


  let catList=window.sessionStorage.getItem('categoryList')
  const [catCars,setCatCars] = React.useState([]);
  
  if (!catList){
    axios
    .post(window.serverUrl + "/api/cars/getcategory", {}, axiosConfig)
    .then((d) => {
      catList = JSON.stringify( d.data);
      window.sessionStorage.setItem("categoryList",catList);
    })
    .catch((e) => {
      console.log(e);
    });
  }
  const parms=useParams();
  let categoryObj = JSON.parse(catList).find((d)=>{return(d.name===(parms.categoryName))})

  React.useEffect(()=>{
    axios
    .post(window.serverUrl + "/api/cars/getcategorycars", {catId:categoryObj._id}, axiosConfig)
    .then((d) => {
      setCatCars(d.data);
    })
    .catch((e) => {
      console.log(e);
    });
  },[]);
  
  // console.log(catCars);


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
        src={categoryObj.imgUrl}
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
        {catCars.map((d, i) => {
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
