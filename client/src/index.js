import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { NotificationPropProvider } from "./context/NotificationPropContext";
import { UserProvider } from "./context/UserContext";
import { AuthProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <Router>
      <AuthProvider>
        <UserProvider>
          <NotificationPropProvider>
            <App />
          </NotificationPropProvider>
        </UserProvider>
      </AuthProvider>
    </Router>
  // </React.StrictMode>
);

