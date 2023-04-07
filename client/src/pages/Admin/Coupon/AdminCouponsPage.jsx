import { Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import CouponCard from './CouponCard'
import axios from "axios";
import axiosConfig from '../../../utilities/axiosConfig';
import AddCoupon from './AddCoupon';


const AdminCouponsPage = () => {
    const [couponList, setCouponList] = React.useState([]);
    React.useEffect(() => {

        axios.post(window.serverUrl + '/api/admin/listcoupons', {}, axiosConfig).then((d) => {
            setCouponList(d.data);
        }).catch((e) => { console.log(e) })
    }, [])
    console.log(couponList);
    return (
        <>
            <Typography variant="h4" sx={{ mb: 4 }}>
                Coupons Manage
            </Typography>
            <Stack direction={'row'} justifyContent={'flex-end'}>
                <AddCoupon />
            </Stack>
            <Grid container spacing={2}>
                {
                    couponList.map((d, i) => {
                        return (
                            <Grid item xs={2} key={i}>
                                <CouponCard data={d} />
                            </Grid>)
                    })
                }
            </Grid>
        </>
    )
}
export default AdminCouponsPage