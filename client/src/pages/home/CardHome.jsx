import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function CardHome(props) {
  console.log(props.data);
  return (
    <Card sx={{ maxWidth: 'auto' }}>
      <CardMedia
        sx={{ height: 140 }}
        image={props.data.imgUrl.default}
        title={props.data.desc}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.data.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.data.desc}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
