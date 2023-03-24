import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { NotificationPropContext } from "../../context/NotificationPropContext";
import { AuthContext } from "../../context/AuthContext";
import {UserContext} from "../../context/UserContext";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        wheelz
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

function ValidateEmail(mail) {
  // eslint-disable-next-line
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
}

export default function SignIn(props) {
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [enableSubmit, setEnableSubmit] = React.useState(true);
  const { notificationProp, setNotificationProp } = React.useContext(
    NotificationPropContext
  );
  const { setAuthStatus } = React.useContext(AuthContext);
  const { user, setUser } = React.useContext(UserContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
    axios
      .post(window.serverUrl + "/api/auth/login", {
        email: data.get("email"),
        password: data.get("password"),
      })
      .then((d) => {
        if (d.data.success) {
          props.handleClose();
          setNotificationProp((t) => {
            return {
              open_: true,
              severity: "success",
              message: d.data.message,
            };
          });
          setAuthStatus(true);
          setUser(d.data.user);
          window.token=d.data.token;
          window.localStorage.setItem('token',d.data.token);
        }
      })
      .catch((e) => {
        setNotificationProp((t) => {
          return {
            open_: true,
            severity: "error",
            message: e.response.data.message,
          };
        });
        setAuthStatus(false);
        setUser({});
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              error={emailError === "" ? false : true}
              helperText={emailError}
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              onBlur={() => {
                if (!ValidateEmail(email)) {
                  setEmailError("Invalid email address");
                } else {
                  setEmailError("");
                  axios
                    .post(window.serverUrl + "/api/auth/checkmail", {
                      email: email,
                    })
                    .then((d) => {
                      if (d.data) {
                        setEmailError("");
                        setEnableSubmit(true);
                      } else {
                        setEmailError("email not registered");
                        setEnableSubmit(false);
                      }
                    })
                    .catch((e) => {});
                }
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" defaultChecked />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!enableSubmit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="#"
                  variant="body2"
                  onClick={() => {
                    props.showSignUp_(false);
                  }}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
