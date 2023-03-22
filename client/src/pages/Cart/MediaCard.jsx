import {
  Paper,
  Grid,
  Box,
  Typography,
  IconButton,
  ButtonGroup,
  TextField,
} from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { Stack } from "@mui/system";

function MediaCard() {
  return (
    <Paper elevation={1} sx={[{ p: 1 }, { "&:hover": { boxShadow: 3 } }]}>
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
            src="https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt=""
            sx={{ width: "100%", borderRadius: 1, p: 1 }}
          ></Box>
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Stack direction={"column"} sx={{pl:1}}>
            <Typography variant="h6" component={"span"}>
              Details
            </Typography>
          </Stack>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ButtonGroup
            variant="text"
            aria-label="outlined button group"
            sx={{ mx: "25%" }}
          >
            <IconButton color="primary" sx={{ borderRadius: 0, color: "grey" }}>
              <RemoveIcon />
            </IconButton>
            <TextField focused color="grey" size="small"/>
            <IconButton color="primary"  sx={{ borderRadius: 0, color: "grey" }}>
              <AddIcon />
            </IconButton>
          </ButtonGroup>
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
          <Typography variant="h6" component={"span"}>
            Price
          </Typography>
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
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default MediaCard;
