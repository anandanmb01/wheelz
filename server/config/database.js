const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URL);

const userSchema = new mongoose.Schema({
  username: "string",
  password: "string",
  email: "string",
  phoneNo: "string",
  firstName: "string",
  lastName: "string",
  address: "string",
  googleId: "string",
  facebookId: "string",
  orders: "object",
  vendor: "object",
  admin:"object"
});
const userModel = mongoose.model("user", userSchema);

const carCategorySchema = new mongoose.Schema({
  name: "string",
  desc: "string",
  imgUrl: "string",
});
const carCategoryModel = mongoose.model("carCategory", carCategorySchema);

const carouselSchema = new mongoose.Schema({
  name: "string",
  desc: "string",
  imgUrl: "string",
});
const carouselModel = mongoose.model("carousel", carouselSchema);

const carSchema = new mongoose.Schema({
  name: "string",
  enable: "string",
  catId: "string",
  rating: "string",
  vendor: "object",
  imgUrl: "object",
  desc: "string",
  remark: "string",
  discount: "string",
  price: "string",
  newArrival: "boolean",
  spec:'object'
});
const carModel = mongoose.model("car", carSchema);

module.exports = { userModel, carCategoryModel, carouselModel, carModel };
