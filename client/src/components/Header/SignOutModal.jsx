import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { AuthContext } from "../../context/AuthContext";
import { UserContext } from "../../context/UserContext";
import { NotificationPropContext } from "../../context/NotificationPropContext";
import { useNavigate } from "react-router-dom";

export default function SignOutModal(props) {
  const { setUser } = React.useContext(UserContext);
  const { setAuthStatus } = React.useContext(AuthContext);
  const { setNotificationProp } = React.useContext(NotificationPropContext);
  const navigator = useNavigate();

  const handleClose = () => {
    props.setShowSignOut(false);
  };

  const handleSignOut = () => {
    props.setShowSignOut(false);
    setNotificationProp({
      open_: true,
      severity: "success",
      message: "Sign out successful",
    });
    setAuthStatus(false);
    setUser({});
    window.localStorage.removeItem("token");
    delete window.token;
    navigator('/');
  };

  return (
    <div>
      <Dialog
        open={props.showSignOut}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Sign Out"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure want to sign out
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleSignOut} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
