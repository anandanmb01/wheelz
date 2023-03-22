import React, { useContext } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Stack,
  Grid,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import HeaderSearch from "./HeaderSearch";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { AuthContext } from "../../context/AuthContext";


const Header = () => {
  // eslint-disable-next-line
  const {authStatus : auth ,setAuthStatus} = useContext(AuthContext)
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box my={1} sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Grid
            container
            spacing={2}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Grid item xs={2}>
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
                <Typography variant="h6" component="div" sx={{ flexGrow: 1,mx:1 }}>
                  Wheelz
                </Typography>
              </IconButton>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Stack direction={"row"} sx={{ width: "100%" }}>
                <HeaderSearch />
              </Stack>
              {/* <Stack sx={{ flexGrow: 1 }}></Stack> */}
            </Grid>
            <Grid
              item
              xs={2}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                pr: 2,
              }}
            >
              {auth ? (
                <div>
                  <Stack direction={"row"} sx={{ alignItems: "center" }}>
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color="inherit"
                    >
                      <ShoppingCartIcon sx={{ width: 32, height: 32}} />
                    </IconButton>
                    <Stack
                      direction={"row"}
                      boxShadow={1}
                      sx={{ alignItems: "center" ,borderRadius:1}}
                    >
                      <IconButton
                        size="medium"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                      >
                        <AccountCircle sx={{ width: 32, height: 32 }} />
                      </IconButton>
                      <Typography variant="body1" sx={{ mx: 1 }}>
                        username
                      </Typography>
                    </Stack>
                  </Stack>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                  </Menu>
                </div>
              ) : (
                <Button color="inherit">Sign in</Button>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
