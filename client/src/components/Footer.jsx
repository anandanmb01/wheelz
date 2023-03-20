import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
} from "@mui/material";

const Footer = () => {
  return (
    <Box my={1} sx={{ flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            style={{ borderRadius: "0" }}
          >
            {/* <MenuIcon /> */}
            <img
              src={process.env.PUBLIC_URL + "/images/icon.png"}
              alt="icon"
              style={{ width: "50px" }}
            ></img>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Wheelz
            </Typography>
          </IconButton>
          <Stack sx={{ flexGrow: 1 }}></Stack>
          <Typography variant="h6">Footer</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Footer;
