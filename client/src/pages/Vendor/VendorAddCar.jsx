import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Paper } from "@mui/material";
import { Grid, TextField } from "@mui/material";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import { Divider, Rating } from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { CheckBox } from "@mui/icons-material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import axios from "axios";
import axiosConfig from "../../utilities/axiosConfig";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Switch from "@mui/material/Switch";
import SaveIcon from "@mui/icons-material/Save";
import { NotificationPropContext } from "../../context/NotificationPropContext";
import ImagePallet from "./ImagePallet/ImagePallet";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

export default function VendorAddCar() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [rating, setRating] = React.useState("");
  const [cat, setCat] = React.useState([]);

  const { notificationProp, setNotificationProp } = React.useContext(
    NotificationPropContext
  );
  React.useEffect(() => {
    axios
      .post(window.serverUrl + "/api/cars/getcategory", axiosConfig)
      .then((d) => {
        setCat(d.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });

    let obj = {};
    data.forEach((value, key) => {
      obj[key] = value;
    });

    let out = {
      name: obj.name,
      enable: obj.enable,
      catId: obj.catId,
      rating: obj.rating,
      imgUrl: obj.imgUrl,
      desc: obj.desc,
      remark: obj.remark,
      discount: obj.discount,
      price: obj.price,
      newArrival: obj.newArrival,
      spec: {
        power: obj.power,
        Torque: obj.Torque,
        cylinder: obj.cylinder,
        accleration: obj.accleration,
        topSpeed: obj.topSpeed,
        tank: obj.tank,
        transmission: obj.transmission,
      },
    };

    axios
      .post(window.serverUrl + "/api/vendor/registercar", out, axiosConfig)
      .then((d) => {
        // console.log(d.data);
        setNotificationProp({
          open_: true,
          severity: "success",
          message: "Car added successfully",
        });
        window.location.reload(false);
      })
      .catch((e) => {
        console.log(e);
        setNotificationProp({
          open_: true,
          severity: "error",
          message: "Error while registering",
        });
      });
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="outlined">
        <DirectionsCarIcon sx={{ mx: 1 }} /> Add car
      </Button>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Paper style={style} sx={{ p: 2, minWidth: "800px" }}>
            <Box
              display={"flex"}
              mb={2}
              sx={{ justifyContent: "center", alignItems: "center" }}
            >
              <DirectionsCarFilledIcon fontSize="large" />
              <Typography variant="h6" component="span" mx={2}>
                Add Car
              </Typography>
            </Box>
            <Divider />
            <Box component="form" noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2} p={2} my={1}>
                <Grid item xs={4}>
                  <TextField
                    required
                    id="name"
                    label="name"
                    name="name"
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControl variant="standard">
                    <InputLabel id="category">category</InputLabel>
                    <Select
                      labelId="category"
                      id="category"
                      label="category"
                      name="catId"
                      sx={{ width: "150px" }}
                    >
                      {cat.map((cat, i) => {
                        return (
                          <MenuItem key={i} value={cat?._id}>
                            {cat?.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <Rating
                    name="rating"
                    value={Number(rating)}
                    onChange={(event, newValue) => {
                      setRating(newValue);
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    required={true}
                    id="price"
                    label="price"
                    name="price"
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    required={true}
                    id="discount"
                    label="discount"
                    name="discount"
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    required={true}
                    id="desc"
                    label="desc"
                    name="desc"
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    required={true}
                    id="remark"
                    label="remark"
                    name="remark"
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid
                  item
                  xs={4}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="body">New arrival</Typography> <Switch />
                </Grid>
                <Grid
                  item
                  xs={4}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="body">Enable</Typography>{" "}
                  <Switch defaultChecked />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    required={true}
                    id="imgUrl"
                    label="imgUrl"
                    name="imgUrl"
                    variant="outlined"
                    size="small"
                  />
                  <Paper></Paper>
                </Grid>
              </Grid>
              <Typography variant="h6" component="span" mx={2}>
                Spec
              </Typography>
              <Divider />
              <Grid container spacing={2} p={2} mt={1}>
                <Grid item xs={4}>
                  <TextField
                    required={true}
                    id="Power"
                    label="Power"
                    name="power"
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    required={true}
                    id="Torque"
                    label="Torque"
                    name="Torque"
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    required={true}
                    id="Cylinder"
                    label="Cylinder"
                    name="cylinder"
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    required={true}
                    id="Accleration"
                    label="Accleration"
                    name="accleration"
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    required={true}
                    id="Top speed"
                    label="Top speed"
                    name="topSpeed"
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    required={true}
                    id="Tank"
                    label="Tank"
                    name="tank"
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    required={true}
                    id="Transmission"
                    label="Transmission"
                    name="transmission"
                    variant="outlined"
                    size="small"
                  />
                </Grid>
              </Grid>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button type="submit" variant="outlined">
                  <SaveIcon sx={{ mx: 1 }} />
                  Submit
                </Button>
              </Box>
            </Box>
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
}
