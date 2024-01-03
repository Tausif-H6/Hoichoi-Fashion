import { connect } from "@/dbConfig/dbConfig";
import {Product} from "../models/userModel"
export let cart = [];
connect()
export const addTocart = async (productId)=>{
 try {
    const product = await Product.findOne({_id:productId})
    console.log("Product by id",product);
    if (product) {
        cart.push(product);
    }
 } catch (error) {
    console.error("Error fetching product details:", error);
 }
}

export const removeFromCart = (productId)=>{
    cart= cart.filter((item)=>item._id.toString() !== productId)
}
utils.js

