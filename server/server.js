require("dotenv").config();
const express = require("express");
var bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const authRoute = require("./routes/authRoute");
const accountRoute = require("./routes/accountRoute");
const carRoute = require("./routes/carRoute");
const vendorRoute = require("./routes/vendorRoute");
const adminRoute = require("./routes/adminRoute");
const commandRoute = require("./routes/commandRoute");
const paymentRoute = require("./routes/paymentRoute");


const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());

function vendorGuard(req, res, next) {
  if (req?.user?.vendor) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}

function adminGuard(req, res, next) {
  if (req?.user?.admin) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}

require("./config/passportConfig");

app.all("/", (req, res) => {
  res.json({ status: "wheelz" });
});

app.all("/api", (req, res) => {
  res.json({ status: "wheelz api" });
});

app.use("/api/auth", authRoute);
app.use(
  "/api/account",
  passport.authenticate("jwt", { session: false }),
  accountRoute
);
app.use("/api/cars", carRoute);
app.use(
  "/api/vendor",
  passport.authenticate("jwt", { session: false }),
  vendorGuard,
  vendorRoute
);
app.use(
  "/api/admin",
  passport.authenticate("jwt", { session: false }),
  adminGuard,
  adminRoute
);
app.use(
  "/api/command",
  passport.authenticate("jwt", { session: false }),
  commandRoute
);

app.use(
  "/api/payment",
  passport.authenticate("jwt", { session: false }),
  paymentRoute
);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
