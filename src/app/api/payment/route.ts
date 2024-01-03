import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const {
      cart,
      totalPrice,
      // Add other necessary information from the cart
    } = await request.json();

    console.log("Cat info backend ", cart);

    const tran_id = Math.floor(100000 + Math.random() * 900000).toString();
    const init_url = `https://sandbox.sslcommerz.com/gwprocess/v4/api.php`;
    const formData = new FormData();
    formData.append("store_id", "tausi658926afb59af");
    formData.append("store_passwd", "tausi658926afb59af@ssl");
    formData.append("total_amount", totalPrice.toString());
    formData.append("currency", "BDT");
    formData.append("tran_id", `${tran_id}`);
    formData.append(
      "success_url",
      `http://localhost:3000/api/success?id=${tran_id}`
    );
    formData.append("fail_url", `http://localhost:3000/api/fail?id=${tran_id}`);
    formData.append(
      "cancel_url",
      `http://localhost:3000/api/cancel?id=${tran_id}`
    );
    formData.append("ipn_url", `http://localhost:3000/api/ipn?id=${tran_id}`);
    formData.append("cus_email", "tsftous9f2@gmail.com");
    formData.append("cus_name", "Tausif Hossain");
    formData.append("cus_country", "Bangladesh");
    formData.append("cus_phone", "01682597454");
    formData.append("cus_add1", "Lalbag Dhaka");
    formData.append("cus_city", "Dhaka");
    formData.append("ship_name", "");
    formData.append("ship_add1", "oopp");
    formData.append("ship_add2", "oopp");
    formData.append("ship_city", "oopp");
    formData.append("ship_state", "oopp");
    formData.append("ship_postcode", "oopp");
    formData.append("ship_country", "oopp");
    formData.append("shipping_method", "Courier");
    formData.append("ship_name", "Tausif");
    formData.append("product_profile", "General");
    cart.forEach((item: any) => {
      formData.append(`product_name`, item.name);
      formData.append(`product_category`, item.product_category);
      formData.append(`product_price`, item.price.toString());
      // Add other necessary information for each item
    });

    const requestOptions = { method: "POST", body: formData };
    let SSLRES = await fetch(init_url, requestOptions);
    let SSLRESJSON = await SSLRES.json();
    return NextResponse.json({ data: SSLRESJSON });
  } catch (error) {
    console.error("Error initializing payment:", error);
    // Send an error response with status code 500
    return NextResponse.json({ data: error });
  }
}
