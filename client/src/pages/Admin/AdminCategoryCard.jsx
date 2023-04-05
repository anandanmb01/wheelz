import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export default function AdminCategoryCard(props) {

  const navigate = useNavigate()
  return (
    <Card sx={{ maxWidth: 'auto' }}>
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
      <CardActions >
        {/* <Button size="small">Share</Button> */}
        <Button size="small" onClick={()=>{navigate(`/category/${props.data.name}`)}}>Delete</Button>
      </CardActions>
    </Card>
  );
}

