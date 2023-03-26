import { Paper, Grid, Typography } from "@mui/material";
import React from "react";

function MediaHeader() {
  return (
    <Paper elevation={0} sx={{ p: 0 }}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={5}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            color={"grey"}
            component={"span"}
            sx={{ fontWeight: "bold" }}
          >
            Product details
          </Typography>
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
          <Typography
            variant="h6"
            color={"grey"}
            component={"span"}
            sx={{ fontWeight: "bold" }}
          >
            Quantity
          </Typography>
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
          <Typography
            variant="h6"
            color={"grey"}
            component={"span"}
            sx={{ fontWeight: "bold" }}
          >
            Booking
          </Typography>
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
          <Typography
            variant="h6"
            color={"grey"}
            component={"span"}
            sx={{ fontWeight: "bold" }}
          >
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
          <Typography
            variant="h6"
            color={"grey"}
            component={"span"}
            sx={{ fontWeight: "bold" }}
          >
            Icon
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default MediaHeader;
