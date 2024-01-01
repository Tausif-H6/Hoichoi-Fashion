import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide a email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  isVerfied: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a username"],
    unique: false,
  },
  description: {
    type: String,
    required: [true, "Please provide a username"],
    unique: false,
  },
  size: {
    type: String,
    required: [true, "Please provide a username"],
    unique: false,
  },
  price: {
    type: Number,
    required: [true, "Please provide a username"],
    unique: false,
  },
  product_category: {
    type: String,
    required: [true, "Please provide a product category"],
    unique: false,
  },

  picture: {
    type: String, // Assuming the picture is stored as a URL
    default: "./hoichoi.jpg", // You can set a default avatar URL if n
    require: true,
  },
});



const User = mongoose.models.users || mongoose.model("users", userSchema);
const Product = mongoose.models.product || mongoose.model("product",productSchema);
export { User, Product };
