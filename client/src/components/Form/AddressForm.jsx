import { Button, Grid, Paper, Stack, TextField, Typography } from '@mui/material'
import React from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";


const AddressForm = () => {

  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      addr1: "",
      addr2: "",
      city: "",
      postalcode: "",
      state: "",
      country: "",
      mobile: "",
      landmark: "",

    },
    validationSchema: Yup.object({
      fname: Yup.string().required(),
      lname: Yup.string().required(),
      addr1: Yup.string().required(),
      addr2: Yup.string().required(),
      city: Yup.string().required(),
      postalcode: Yup.string().required(),
      state: Yup.string().required(),
      country: Yup.string().required(),
      mobile: Yup.string().required(),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });


  return (
    <>
      <Paper sx={{ minWidth: "800px" }}>
        <Typography p={2} pt={3} variant="h5" fontWeight={'bold'}>Billing Address</Typography>
        <form onSubmit={formik.handleSubmit}>

          <Grid container p={4} spacing={4}>
            <Grid item xs={12} sm={6}>
              <TextField id="standard-basic" name="fname"
                onChange={formik.handleChange}
                value={formik.values.fname}
                helperText={formik.errors.fname}
                error={Boolean(formik.touched.fname && formik.errors.fname)}
                sx={{ width: "100%" }} label="First Name" variant="standard" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField id="standard-basic" name="lname"
                onChange={formik.handleChange}
                value={formik.values.lname}
                helperText={formik.errors.lname}
                error={Boolean(formik.touched.lname && formik.errors.lname)}
                sx={{ width: "100%" }}
                label="Last Name" variant="standard" />

            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField id="standard-basic" name="addr1"
                onChange={formik.handleChange}
                value={formik.values.addr1}
                helperText={formik.errors.addr1}
                error={Boolean(formik.touched.addr1 && formik.errors.addr1)}
                sx={{ width: "100%" }}
                label="Address Line 1" variant="standard" />

            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField id="standard-basic" name="addr2"
                onChange={formik.handleChange}
                value={formik.values.addr2}
                helperText={formik.errors.addr2}
                error={Boolean(formik.touched.addr2 && formik.errors.addr2)}
                sx={{ width: "100%" }}
                label="Address Line 2" variant="standard" />

            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField id="standard-basic" name="city"
                onChange={formik.handleChange}
                value={formik.values.city}
                helperText={formik.errors.city}
                error={Boolean(formik.touched.city && formik.errors.city)}
                sx={{ width: "100%" }}
                label="City" variant="standard" />

            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField id="standard-basic" name="postalcode"
                onChange={formik.handleChange}
                value={formik.values.postalcode}
                helperText={formik.errors.postalcode}
                error={Boolean(formik.touched.postalcode && formik.errors.postalcode)}
                sx={{ width: "100%" }}
                label="Postal code" variant="standard" />

            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField id="standard-basic" name="state"
                onChange={formik.handleChange}
                value={formik.values.state}
                helperText={formik.errors.state}
                error={Boolean(formik.touched.state && formik.errors.state)}
                sx={{ width: "100%" }}
                label="State" variant="standard" />

            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField id="standard-basic" name="country"
                onChange={formik.handleChange}
                value={formik.values.country}
                helperText={formik.errors.country}
                error={Boolean(formik.touched.country && formik.errors.country)}
                sx={{ width: "100%" }}
                label="Country" variant="standard" />

            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField id="standard-basic" name="mobile"
                onChange={formik.handleChange}
                value={formik.values.mobile}
                helperText={formik.errors.mobile}
                error={Boolean(formik.touched.mobile && formik.errors.mobile)}
                sx={{ width: "100%" }}
                label="Mobile" variant="standard" />

            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField id="standard-basic" name="landmark"
                onChange={formik.handleChange}
                value={formik.values.landmark}
                helperText={formik.errors.landmark}
                error={Boolean(formik.touched.landmark && formik.errors.landmark)}
                sx={{ width: "100%" }}
                label="Land Mark" variant="standard" />

            </Grid>


          </Grid>
          <Stack p={2} pb={3}
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={2}>
          <Button type='submit' variant='outlined' size='smallsss'>submit</Button>
          </Stack>
        </form>
      </Paper>
    </>

  )
}
export default AddressForm
