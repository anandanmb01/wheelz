import {
  Paper,
  Grid,
  Box,
  Typography,
  IconButton,
  ButtonGroup,
} from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Rating from "@mui/material/Rating";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { CartContext } from "../../context/CartContext";
import Stack from "@mui/material/Stack";
import shadows from "@mui/material/styles/shadows";
import CheckIcon from '@mui/icons-material/Check';


function MediaCard(props) {
  const { cart, setCart } = React.useContext(CartContext);
  const handleChange = (event) => {
    setCart((t) => {
      let x = t;
      x[props.data._id].order.count = event.target.value;
      // console.log(event.target.value);
      return { ...x };
    });
  };

  return (
    <Paper elevation={props.checkout ? 0 : 1} p={1} sx={props.checkout ? {} : [{ "&:hover": { boxShadow: 3 } }]}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component={"img"}
            src={props.data?.imgUrl[`${props.data?.order?.color}`]}
            alt=""
            sx={{ width: "100%", borderRadius: 1, p: 1 }}
          ></Box>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Stack direction={"column"} sx={{ pl: 1, mt: -1 }}>
            <Typography variant="h6" component={"span"}>
              {/*  */}
              <Typography gutterBottom variant="h5" component="div">
                {props.data.name}
              </Typography>
              <Stack direction={"row"}>
                <Typography variant="body2" color="text.secondary">
                  Review :
                </Typography>
                <Rating
                  name="read-only"
                  value={Number(props.data.rating)}
                  precision={0.25}
                  size="small"
                  readOnly
                />
              </Stack>
              <Stack direction={"row"}>
                <Typography variant="body2" color="text.secondary">
                  Top speed :
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ ml: "5px" }}
                >
                  {` ${props.data?.spec?.topSpeed}`}
                </Typography>
              </Stack>
              <Stack direction={"row"}>
                <Typography variant="body2" color="text.secondary">
                  Accleration :
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ ml: "5px" }}
                >
                  {` ${props.data?.spec?.accleration}`}
                </Typography>
              </Stack>
              <Stack direction={"row"}>
                <Typography variant="body2" color="text.secondary">
                  Discount :
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ ml: "5px" }}
                >
                  {` ${props.data?.discount} %`}
                </Typography>
              </Stack>
              {/*  */}
            </Typography>
          </Stack>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {props.checkout ? <Typography variant="h6">{`${cart[props.data._id].order.count}`}</Typography> :
            <ButtonGroup
            variant="text"
            aria-label="outlined button group"
            sx={{ mx: "25%" }}
          >
            <IconButton
              color="primary"
              sx={{ borderRadius: 0, color: "grey" }}
              onClick={() => {
                setCart((t) => {
                  let x = t;
                  let y = x[props.data._id].order.count;
                  x[props.data._id].order.count = y === 1 ? 1 : y - 1;
                  return { ...x };
                });
              }}
            >
              <RemoveIcon />
            </IconButton>
            {/*  */}
            {/* <TextField focused color="grey" size="small"/> */}

            <Box sx={{ minWidth: 50 }}>
              <FormControl fullWidth>
                <InputLabel id="count">count</InputLabel>
                <Select
                  labelId="count"
                  id="count"
                  value={cart[props.data._id].order.count}
                  label="count"
                  onChange={handleChange}
                >
                  {[...Array(10).keys()].map((d) => {
                    return (
                      <MenuItem key={d + 1} value={d + 1}>
                        {d + 1}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>

            {/*  */}
            <IconButton
              color="primary"
              sx={{ borderRadius: 0, color: "grey" }}
              onClick={() => {
                setCart((t) => {
                  let x = t;
                  let y = x[props.data._id].order.count;
                  x[props.data._id].order.count = y === 10 ? 10 : y + 1;
                  return { ...x };
                });
              }}
            >
              <AddIcon />
            </IconButton>
          </ButtonGroup>}
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack direction={"column"}>
            <Typography variant="h6" component={"span"}>
              {props.data?.price -
                props.data?.price * Number(props.data.discount) * 0.01}
              {" ₹"}
            </Typography>
            <Typography
              variant="caption"
              sx={{ pl: 2, textDecoration: "line-through" }}
            >
              {props.data?.price}
              {" ₹"}
            </Typography>
          </Stack>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack direction={"column"}>
            <Typography variant="h6" component={"span"}>
              {(props.data?.price -
                props.data?.price * Number(props.data.discount) * 0.01) *
                Number(props.data.order.count)}
              {" ₹"}
            </Typography>
          </Stack>
        </Grid>
        <Grid
          item
          xs={1}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {props.checkout ? <CheckIcon /> :
            <IconButton
              aria-label="delete"
              onClick={() => {
                setCart((t) => {
                  let x = t;
                  delete x[props.data._id];
                  return { ...x };
                });
              }}
            >
              <DeleteIcon />
            </IconButton>}
        </Grid>
      </Grid>
    </Paper>
  );
}

export default MediaCard;
