import React from "react";
import Header from "./components/Header/Header";
import Home from "./pages/home/Home";
import "./App.css";
import Footer from "./components/Footer";
import Product from "./pages/Product/Product";
import CategoryProductList from "./pages/Category/CategoryProductList";
import CartPage from "./pages/Cart/CartPage";
import { AuthContext } from "./context/AuthContext";
import { Routes, Route } from "react-router-dom";
import axiosConfig from "./utilities/axiosConfig";
import axios from "axios";
import { NotificationPropContext } from "./context/NotificationPropContext";
import { UserContext } from "./context/UserContext";
import { CartContext } from "./context/CartContext";
import Vendor from "./pages/Vendor/Vendor";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import VendorRegister from "./pages/Vendor/VendorRegister";
import { Box } from "@mui/material";
import Admin from "./pages/Admin/Admin";

const theme = "light";

const darkTheme = createTheme({
  palette: {
    mode: theme,
  },
});

window.serverUrl = "http://127.0.0.1:5000";

const handleTabClose = (cart) => {
  if (cart !== {}) {
    window.localStorage.setItem("cart", JSON.stringify(cart));
  }
};

function App() {
  const { setAuthStatus } = React.useContext(AuthContext);
  const { setUser } = React.useContext(UserContext);
  const { setNotificationProp } = React.useContext(NotificationPropContext);
  const { cart, setCart } = React.useContext(CartContext);
  window.addEventListener("beforeunload", () => {
    handleTabClose(cart);
  });

  React.useEffect(() => {
    (() => {
      const token = window.localStorage.token;
      if (token) {
        window.token = token;
        axios
          .post(window.serverUrl + "/api/account/getuser", {}, axiosConfig)
          .then((d) => {
            setAuthStatus(true);
            setUser(d.data.user);
            setNotificationProp({
              open_: true,
              severity: "success",
              message: "Logged in successfully",
            });
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
      }
    })();
  }, []);

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header />
        <Box sx={{minHeight:'calc(100vh - 192px)'}}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/cart" element={true ? <CartPage /> : <Home />} />
          <Route
            path="/category/:categoryName"
            element={true ? <CategoryProductList /> : <Home />}
          />
          <Route
            path="/product/:productId"
            element={true ? <Product /> : <Home />}
          />
          <Route path="/vendor" element={true ? <Vendor /> : <Home />} />
          <Route path="/admin" element={true ? <Admin /> : <Home />} />
          <Route
            path="/vendor-register"
            element={true ? <VendorRegister /> : <Home />}
          />
        </Routes>
        </Box>
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default App;
