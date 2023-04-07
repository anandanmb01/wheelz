import { Grid, Typography } from "@mui/material";
import React from "react";
import axios from "axios";
import axiosConfig from "../../../utilities/axiosConfig";
import AdminCategoryCard from "./AdminCategoryCard";
import AddCategory from "./AddCategory";

const AdminCategoryPage = () => {
  const [categoryList, setCategoryList] = React.useState([]);
  React.useEffect(() => {
    axios
      .post(window.serverUrl + "/api/cars/getcategory", {}, axiosConfig)
      .then((d) => {
        setCategoryList(d.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Category Manage
      </Typography>
      <Grid container spacing={2}>
        {categoryList.map((item, index) => (
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
        <AddCategory/>
        </Grid>
      </Grid>
    </>
  );
};

export default AdminCategoryPage;
