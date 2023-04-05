import { Grid, Typography } from "@mui/material";
import React from "react";
import CategoryCard from "../home/CategoryCard";
import axios from "axios";
import axiosConfig from "../../utilities/axiosConfig";
import AdminCategoryCard from "./AdminCategoryCard";
import AddCarousel from "./AddCarousel";


const AdminCarouselPage = () => {
  const [carouselList, setCarouselList] = React.useState([]);
  React.useEffect(() => {
    axios
      .post(window.serverUrl + "/api/cars/getcarousel", {}, axiosConfig)
      .then((d) => {
        setCarouselList(d.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Carousel Manage
      </Typography>
      <Grid container spacing={2}>
        {carouselList.map((item, index) => (
          <Grid item xs={2} sm={2} md={2} lg={2} key={index}>
            <AdminCategoryCard data={item} />
          </Grid>
        ))}
        <Grid
          item
          xs={1}
          sx={{
            display: "flex",
            alignItems: "centre",
            justifyContent: "center",
          }}
        >
        <AddCarousel/>
        </Grid>
      </Grid>
    </>
  );
};

export default AdminCarouselPage;
