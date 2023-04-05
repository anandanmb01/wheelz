import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import HomeIcon from "@mui/icons-material/Home";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import StoreIcon from "@mui/icons-material/Store";
import { Stack } from "@mui/material";
import axios from "axios";
import axiosConfig from "../../utilities/axiosConfig";
import { NotificationPropContext } from "../../context/NotificationPropContext";
import { useNavigate } from "react-router-dom";
import AdminHome from "./AdminHome";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import AdminCarouselPage from "./AdminCarouselPage";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ width: "100%", height: "100%" }}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function Admin() {
  const [value, setValue] = React.useState(0);
  const { setNotificationProp } = React.useContext(NotificationPropContext);
  const navigator = useNavigate();

  React.useEffect(() => {
    axios
      .post(window.serverUrl + "/api/command/checkadmin", {}, axiosConfig)
      .then((d) => {
        if (d.data?.success) {
          setNotificationProp({
            open_: true,
            severity: "success",
            message: "Welcome admin",
          });
        }
      })
      .catch((e) => {
        setNotificationProp({
          open_: true,
          severity: "error",
          message: "Account doesnot have admin privileges",
        });
        setTimeout(() => {}, 1000);
        navigator("/");
        console.log(e);
      });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box
        width={"100%"}
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Stack direction={"row"} sx={{ alignItems: "center" }}>
          <StoreIcon sx={{ fontSize: 50, mx: 3 }} />
          <Typography variant="h4" component="span" my={3}>
            WHEELZ ADMIN PANEL
          </Typography>
        </Stack>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          height: "70vh",
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
          indicatorColor="secondary"
        >
          <Tab
            icon={<HomeIcon />}
            iconPosition="start"
            label="Home"
            {...a11yProps(0)}
          />
          <Tab
            icon={<RecentActorsIcon />}
            iconPosition="start"
            label="Carousal"
            {...a11yProps(1)}
          />
          <Tab
            icon={<DirectionsCarIcon />}
            iconPosition="start"
            label="Cars"
            {...a11yProps(2)}
          />
          <Tab
            icon={<ShoppingCartCheckoutIcon />}
            iconPosition="start"
            label="Orders"
            {...a11yProps(3)}
          />
          <Tab label="Item Four" {...a11yProps(4)} />
          <Tab label="Item Five" {...a11yProps(5)} />
          <Tab label="Item Six" {...a11yProps(6)} />
          <Tab label="Item Seven" {...a11yProps(7)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <AdminHome />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <AdminCarouselPage />
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item Four
        </TabPanel>
        <TabPanel value={value} index={4}>
          Item Five
        </TabPanel>
        <TabPanel value={value} index={5}>
          Item Six
        </TabPanel>
        <TabPanel value={value} index={6}>
          Item Seven
        </TabPanel>
      </Box>
    </>
  );
}
