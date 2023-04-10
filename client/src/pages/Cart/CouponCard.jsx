import { Box, IconButton, Stack, Typography } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { NotificationPropContext } from '../../context/NotificationPropContext';



const CouponCard = (props) => {
    const { setNotificationProp } = React.useContext(NotificationPropContext);

    function handleClose() {
        props.cl((d) => {
            d.splice(props.key, 1);
            return d;
        })
        setNotificationProp({
            open_: true,
            severity: "success",
            message: "Coupen deleted successfully",
        });

    }


    return (
        <Box boxShadow={1} minWidth={'207px'}>
            <Stack direction={'row'} justifyContent={'space-around'} p={0}>
                <LocalOfferIcon />
                <Typography variant='subtitle2' px={1}>{`${props.data.name}`}</Typography>
                <IconButton onClick={() => { handleClose() }} sx={{ visibility: props.checkout ? "hidden" : "visible" }}>
                    <CloseIcon fontSize='small' px={1} />
                </IconButton>
            </Stack>
        </Box>
    )
}

export default CouponCard