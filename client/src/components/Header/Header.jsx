import React, { useContext, useState } from "react";
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
import { AuthContext } from "../../context/AuthContext";
import SignInModal from "../../pages/Signin/SignInModal";
import Notification from "../Notification";
import { UserContext } from "../../context/UserContext";
import SignOutModal from "./SignOutModal";
import { useNavigate } from "react-router-dom";
import CartIcon from "./CartIcon";


const Header = () => {
  // eslint-disable-next-line


  const { authStatus: auth, setAuthStatus } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showSignIn, setShowSignIn] = useState(false);
  const { user } = useContext(UserContext);
  const [showSignOut, setShowSignOut] = React.useState(false);
  const navigate = useNavigate();

  const closeSignInModal = () => {
    setShowSignIn(false);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handeSignOut() {
    setAnchorEl(null);
    setShowSignOut(true);
  }

  return (
    <>
      <SignOutModal showSignOut={showSignOut} setShowSignOut={setShowSignOut} />
      <Notification />
      <SignInModal state={showSignIn} setState={closeSignInModal} />
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
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  <img
                    src={process.env.PUBLIC_URL + "/images/icon.png"}
                    alt="icon"
                    style={{ width: "50px" }}
                  ></img>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, mx: 1 }}
                  >
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
                      {/* <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                      >
                        <ShoppingCartIcon sx={{ width: 32, height: 32 }} />
                      </IconButton> */}
                      <CartIcon/>
                      <Stack
                        direction={"row"}
                        boxShadow={1}
                        sx={{ alignItems: "center", borderRadius: 1 }}
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
                          {`${user.firstName} ${user.lastName}`}
                        </Typography>
                      </Stack>
                    </Stack>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleClose}>Profile</MenuItem>
                      <MenuItem onClick={handleClose}>My account</MenuItem>
                      <MenuItem onClick={handeSignOut}>Sign out</MenuItem>
                    </Menu>
                  </div>
                ) : (
                  <Button
                    color="inherit"
                    onClick={() => {
                      setShowSignIn(true);
                    }}
                  >
                    Sign in
                  </Button>
                )}
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Header;
