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

window.serverUrl = "http://127.0.0.1:5000";

function App() {
  const { setAuthStatus } = React.useContext(AuthContext);
  const { setUser } = React.useContext(UserContext);
  const { setNotificationProp } = React.useContext(NotificationPropContext);

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
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/cart" element={true ? <CartPage /> : <Home />} />
        <Route
          path="/section/:sectionName"
          element={true ? <CategoryProductList /> : <Home />}
        />
        <Route
          path="/product/:productId"
          element={true ? <Product /> : <Home />}
        />
        {/* <Product/> */}
        {/* <CategoryProductList/> */}
        {/* <CartPage /> */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
