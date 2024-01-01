import { connect } from "@/dbConfig/dbConfig";
import { Product } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
connect();

export async function GET(){
    try {
        // Fetch all products from the database
        const allProducts = await Product.find({});

        // Return the products as JSON response
        return NextResponse.json(allProducts);
    } catch (error:any) {
        // Handle errors
        console.error("Error fetching products:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
