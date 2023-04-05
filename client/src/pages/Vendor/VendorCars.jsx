import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Button, Grid, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";
import axiosConfig from "../../utilities/axiosConfig";
import VendorCarCar from "./VendorCarCard";
import { Divider } from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import VendorAddCar from "./VendorAddCar";

const VendorCars = () => {
  const [options, setOptions] = React.useState([]);

  // console.log(options);

  React.useEffect(() => {
    axios
      .post(
        window.serverUrl + "/api/vendor/searchcar",
        { pattern: "" },
        axiosConfig
      )
      .then((d) => {
        setOptions(d.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  function handleChange(e) {
    axios
      .post(
        window.serverUrl + "/api/vendor/searchcar",
        { pattern: e.target.value },
        axiosConfig
      )
      .then((d) => {
        setOptions(d.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <>
      <Box
        width={"100%"}
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Stack direction={"row"} sx={{ alignItems: "center" }}>
          <Typography variant="h5" component="span" my={3}>
            Manage Cars
          </Typography>
        </Stack>
      </Box>
      <Box my={2}>
        <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
          <Autocomplete
            freeSolo={true}
            selectOnFocus={true}
            clearOnBlur={true}
            handleHomeEndKeys={true}
            size={"small"}
            disablePortal
            id="combo-box-demo"
            options={options}
            sx={{ width: 300 }}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                onChange={(e) => {
                  handleChange(e);
                }}
                label="Search Cars"
              />
            )}
          />
          <VendorAddCar />
        </Stack>
      </Box>
      <Divider />
      <Grid container spacing={2} direction="row" my={2}>
        {options.map((d, i) => {
          return (
            <Grid key={i} item xs={2}>
              <VendorCarCar  data={d} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default VendorCars;
