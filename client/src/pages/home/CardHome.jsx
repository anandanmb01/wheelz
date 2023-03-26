import * as React from "react";
import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";
import Rating from "@mui/material/Rating";

export default function CardHome(props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${props.data._id}`);
  };

  return (
    <Card
      sx={[{ maxWidth: "auto" }, { "&:hover": { boxShadow: 10 } }]}
      onClick={() => {
        handleClick();
      }}
    >
      <CardMedia
        sx={{ height: 140 }}
        image={
          props.data.imgUrl.default
            ? props.data.imgUrl.default
            : props.data.imgUrl.default
        }
        title={props.data.desc}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.data.name}
        </Typography>
        <Stack direction={"row"}>
          <Typography variant="body2" color="text.secondary">
            Review :
          </Typography>
          <Rating
            name="read-only"
            value={Number(props.data.rating)}
            precision={0.25}
            size="small"
            readOnly
          />
        </Stack>
        <Stack direction={"row"}>
          <Typography variant="body2" color="text.secondary">
            Top speed :
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ ml: "5px" }}>
            {` ${props.data?.spec?.topSpeed}`}
          </Typography>
        </Stack>
        <Stack direction={"row"}>
          <Typography variant="body2" color="text.secondary">
            Accleration :
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ ml: "5px" }}>
            {` ${props.data?.spec?.accleration}`}
          </Typography>
        </Stack>
        <Stack direction={"row"}>
          <Typography variant="body2" color="text.secondary">
            Discount :
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ ml: "5px" }}>
            {` ${props.data?.discount} %`}
          </Typography>
        </Stack>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}
