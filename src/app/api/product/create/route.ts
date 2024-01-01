import { connect } from "@/dbConfig/dbConfig";
import { Product } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function POST(req: NextRequest) {
  const reqBody = await req.json();
  const { name, description, size, price, product_category, picture } = reqBody;
  try {
    //Creating new product
    const newProduct = new Product({
      name,
      description,
      size,
      price,
      product_category,
      picture,
    });
    const savedProduct = await newProduct.save();
    return NextResponse.json({
      message: "Product Created ",
      success: true,
      savedProduct,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
