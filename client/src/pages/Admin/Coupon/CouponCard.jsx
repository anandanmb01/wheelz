import { IconButton, Paper, Stack } from '@mui/material'
import React from 'react'
import DiscountIcon from '@mui/icons-material/Discount';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";
import axiosConfig from '../../../utilities/axiosConfig';
import { NotificationPropContext } from '../../../context/NotificationPropContext';




const CouponCard = (props) => {
    const { setNotificationProp } = React.useContext(NotificationPropContext);

    const handleDelete = () => {

        axios.post(window.serverUrl + '/api/admin/deletecoupon', { _id: props.data._id }, axiosConfig).then((d) => {
            setNotificationProp({
                open_: true,
                severity: "info",
                message: "Coupon deleted successfully",
            });
        }).catch((e) => { console.log(e) })
        window.location.reload(false);
    }

    return (<>
        <Paper >
            <Stack direction='row' alignItems={'center'} justifyContent={'space-around'} p={1}>
                <DiscountIcon /> {props.data.name} <div><IconButton sx={{ p: 0.5 }}><EditIcon fontSize='small' /></IconButton> <IconButton onClick={handleDelete} sx={{ p: 0.5 }}><DeleteIcon fontSize='small' /></IconButton></div>
            </Stack>
        </Paper>
    </>
    )
}

export default CouponCard