import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const VendorHome = () => {
  return (
    <Box
    component={'div'}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Typography variant="h4" component="span" my={3}>
        WHEELZ VENDOR PANEL
      </Typography>
    </Box>
  );
};

export default VendorHome;
