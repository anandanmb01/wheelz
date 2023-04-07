import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { NotificationPropProvider } from "./context/NotificationPropContext";
import { UserProvider } from "./context/UserContext";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { CoupenProvider } from "./context/CoupenContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Router>
    <AuthProvider>
      <UserProvider>
        <NotificationPropProvider>
          <CartProvider>
            <CoupenProvider>
              <App />
            </CoupenProvider>
          </CartProvider>
        </NotificationPropProvider>
      </UserProvider>
    </AuthProvider>
  </Router>
  // </React.StrictMode>
);
