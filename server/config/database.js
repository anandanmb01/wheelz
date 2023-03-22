const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URL);

const userSchema = new mongoose.Schema({
  username: "string",
  password: "string",
  email: "string",
  phoneNo: "string",
  firstName: "string",
  lastNmae: "string",
  address: "string",
  googleId: "string",
  facebookId: "string",
  orders: "object",
});
const userModel = mongoose.model("user", userSchema);


module.exports = userModel;