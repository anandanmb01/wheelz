import { Box, Paper } from "@mui/material";
import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import axiosConfig from "../../utilities/axiosConfig";
import { NotificationPropContext } from "../../context/NotificationPropContext";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //   width: 400,
  //   bgcolor: "background.paper",
  //   border: "2px solid #000",
  //   boxShadow: 24,
  //   p: 4,
};

const VendorRegister = () => {
  const { setNotificationProp } = React.useContext(NotificationPropContext);
  const navigate = useNavigate();

  function handleContinue() {
    axios
      .post(window.serverUrl + "/api/command/registervendor", {}, axiosConfig)
      .then((d) => {
        setNotificationProp({
          open_: true,
          severity: "success",
          message: "Registration complete , please relogin",
        });
        navigate('/vendor');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigator = useNavigate();
  const [con, setCon] = React.useState(true);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "inherit",
      }}
    >
      <div>
        <Button onClick={handleOpen}>Register as vendor</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          p={5}
        >
          <Box sx={style}>
            {con ? (
              <Card sx={{ maxWidth: "40vw", p: 5 }}>
                {/* <CardMedia
                sx={{ height: 140 }}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="green iguana"
              /> */}
                <CardContent m={10}>
                  <Typography gutterBottom variant="h5" component="div">
                    Register as vendor
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    You are not registered as a vendor on wheelz continue to
                    register as a vendor to acesss vendor specific features ...
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => {
                      navigator("/");
                    }}
                  >
                    Home
                  </Button>
                  <Button
                    size="small"
                    onClick={() => {
                      handleContinue();
                    }}
                  >
                    Continue
                  </Button>
                </CardActions>
              </Card>
            ) : (
              <></>
            )}
          </Box>
        </Modal>
      </div>
      {/* <ConfirmMail/> */}
    </Box>
  );
};

export default VendorRegister;
