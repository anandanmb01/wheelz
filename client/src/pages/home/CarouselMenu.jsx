import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Box } from '@mui/material'

function CarouselMenu(props)
{
    var items = [
        {
            name: "Random Name #2",
            description: "Hello World!",
            imgsrc:"https://www.audi.in/content/dam/nemo/in/3_O-Homepage/E-tronHub-3840X4000.jpg?imwidth=1920"
        },
        {
          name: "Random Name #2",
          description: "Hello World!",
          imgsrc:"https://www.bmw-evmautokraft.in/sites/default/files/sliders/x1_desktop_offer.png"
        },
        {
          name: "Random Name #2",
          description: "Hello World!",
          imgsrc:"https://www.bmw-evmautokraft.in/sites/default/files/sliders/1680x756_5.jpeg"
        },
        {
          name: "Random Name #2",
          description: "Hello World!",
          imgsrc:"https://www.bmw-evmautokraft.in/sites/default/files/sliders/3gl_desktop.png"
        },
        {
          name: "Random Name #2",
          description: "Hello World!",
          imgsrc:"https://www.bmw-evmautokraft.in/sites/default/files/sliders/m340i.jpg"
        },
    ]

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
      <Box container>
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