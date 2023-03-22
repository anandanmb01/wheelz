import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Box } from '@mui/material'

function CarouselMenu(props)
{
  const items=props.items
    return (
        <Carousel>
            {
                items.map( (item, i) => <Item key={i} item={item}/> )
            }
        </Carousel>
    )
}

function Item(props) {
  return (
    <Paper>
      <Box >
        {/* <Typography variant="h6" component="div">
          {props.item.name}
        </Typography> */}
        <Box
          component="img"
          sx={{
            height: {xs:400,lg:600},
            width: "100%",
            objectFit: "cover",
          }}
          alt="The house from the offer."
          src={props.item.imgsrc}
        />
        {/* <Typography variant="h6" component="div">
          {props.item.description}
        </Typography> */}
      </Box>
    </Paper>
  );
}

export default CarouselMenu