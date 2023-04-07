import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Button, Paper, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import axiosConfig from "../../../utilities/axiosConfig";
import { NotificationPropContext } from "../../../context/NotificationPropContext";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  p: 4,
};

export default function AddCategory() {
  const { setNotificationProp } = React.useContext(NotificationPropContext);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      desc: "",
      url: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().max(15, "must be 15 characters or less").required(),
      desc: Yup.string().required(),
      url: Yup.string().required(),
    }),
    onSubmit: (values) => {
      //   console.log(values);
      axios.post(window.serverUrl + '/api/admin/registercategory', values, axiosConfig).then((d) => {
        setNotificationProp({
          open_: true,
          severity: "success",
          message: "Car category added successfully",
        });
        window.location.reload(false);
      }).catch((e) => { console.log(e) })
    },
  });

  return (
    <>
      <IconButton aria-label="Example" onClick={handleOpen}>
        <AddCircleIcon fontSize="large" />
      </IconButton>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Paper sx={style} >
          <Typography variant="h5" p={2}>Add Car Category</Typography>
            <form onSubmit={formik.handleSubmit}>
              <Stack direction={"row"} sx={{ alignItems: "center" }}>
                <label htmlFor="name">
                  <Typography variant="subtitle1" p={3} width="170px">
                    Name
                  </Typography>
                </label>
                <TextField
                  id="name"
                  label="Name"
                  variant="outlined"
                  name="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  helperText={formik.errors.name}
                  error={Boolean(formik.touched.name && formik.errors.name)}
                  sx={{ width: "100%" }}
                />
              </Stack>
              <Stack direction={"row"} sx={{ alignItems: "center" }}>
                <label htmlFor="desc">
                  <Typography variant="subtitle1" p={3} width="170px">
                    Description
                  </Typography>
                </label>
                <TextField
                  id="desc"
                  label="Description"
                  variant="outlined"
                  name="desc"
                  onChange={formik.handleChange}
                  value={formik.values.desc}
                  helperText={formik.errors.desc}
                  error={Boolean(formik.touched.desc && formik.errors.desc)}
                  sx={{ width: "100%" }}
                />
              </Stack>
              <Stack direction={"row"} sx={{ alignItems: "center" }}>
                <label htmlFor="url">
                  <Typography variant="subtitle1" p={3} width="170px">
                    Url
                  </Typography>
                </label>
                <TextField
                  id="url"
                  label="Url"
                  variant="outlined"
                  name="url"
                  onChange={formik.handleChange}
                  value={formik.values.url}
                  helperText={formik.errors.url}
                  error={Boolean(formik.touched.url && formik.errors.url)}
                  sx={{ width: "100%" }}
                />
              </Stack>
              <Stack
                direction={"row"}
                sx={{
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Button variant="outlined" type="submit">
                  Submit
                </Button>
              </Stack>
            </form>
          </Paper>
        </Fade>
      </Modal>
    </>
  );
}
