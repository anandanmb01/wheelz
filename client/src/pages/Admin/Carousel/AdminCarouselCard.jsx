import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import axiosConfig from "../../../utilities/axiosConfig";
import { NotificationPropContext } from "../../../context/NotificationPropContext";



export default function AdminCarouselCard(props) {
  const { setNotificationProp } = React.useContext(NotificationPropContext);

  const navigate = useNavigate();
  return (
    <Card sx={{ maxWidth: "auto" }}>
      <CardMedia
        sx={{ height: 140 }}
        image={props.data.imgUrl}
        title={props.data.name}
      />
      <CardContent>
        {/* <Typography gutterBottom variant="h5" component="div">
          {props.data.name}
        </Typography> */}
        {/* <Typography variant="body2" color="text.secondary">
          {props.data.desc}
        </Typography> */}
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-around' }}>
        {/* <Button size="small">Share</Button> */}
        <IconButton>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => {
          axios.post(window.serverUrl + '/api/admin/deletecarousel', { _id: props.data._id }, axiosConfig).then((d) => {
            window.location.reload(false);
            setNotificationProp({
              open_: true,
              severity: "success",
              message: "Carousel deleted successfully",
            });
          }).catch((e) => { console.log(e) })
        }}>
          <DeleteIcon />
        </IconButton>

      </CardActions>
    </Card>
  );
}
