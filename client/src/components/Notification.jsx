import * as React from "react";
// import Button from '@mui/material/Button';
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import { Alert } from "@mui/material";
import { NotificationPropContext } from "../context/NotificationPropContext";

export default function Notification(props) {
  const { notificationProp, setNotificationProp } = React.useContext(
    NotificationPropContext
  );

  const handleClose = () => {
    setNotificationProp((t) => {
     return({
      ...t,
      // eslint-disable-next-line
      ["open_"]:false
     })
    });
  };

  return (
    <div>
      {/* <Button onClick={handleClick()}>Right</Button> */}
      <Snackbar
        open={notificationProp.open_}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={1000}
        TransitionComponent={Slide}
      >
        <Alert severity={notificationProp.severity} sx={{ width: "300px" }}>
          {notificationProp.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
