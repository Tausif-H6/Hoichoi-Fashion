import { connect } from "@/dbConfig/dbConfig";
import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import { NextRequest, NextResponse } from "next/server";

// Increase the maximum number of listeners for the NativeConnection
import { connection } from "mongoose";
connection.setMaxListeners(15); // Set an appropriate value

connect();

export async function POST(req) {
  const reqBody = await req.json();
  const { cart } = reqBody;
  console.log(cart);

  const userEmail = "tsftousif2@gmail.com";

  let config = {
    service: "gmail",
    auth: {
      user: "tausif@coobizit.com", //Need to pass it from Env
      pass: "sqnbrmvvvzoezlzw", //Need to pass it from Env
    },
  };
  let transporter = nodemailer.createTransport(config);

  let mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Coobiz It Solution",
      link: "https://mailgen.js",
    },
  });

  let cartItems = cart.map((item) => ({
    item: `<strong>${item.item.description}</strong> (${item.selectedSize})`,
    quantity: item.quantity,
    price: `<span style='color: #d946ef;'>$${item.totalPrice.toFixed(
      2
    )}</span>`,
  }));

  let emailContent = {
    body: {
      name: "Guest User",
      intro:
        "<h2 style='color: #333333;'>Your order has been processed successfully.</h2>",
      table: {
        data: cartItems,
        columns: {
          customWidth: {
            item: "40%",
            quantity: "20%",
            price: "20%",
          },
          customAlignment: {
            price: "right",
          },
        },
      },
      action: {
        instructions:
          "You can check the status of your order and more in your dashboard:",
        button: {
          color: "#3869D4",
          text: "Go to Dashboard",
          link: "https://mailgen.js/confirm?s=d9729feb74992cc3482b350163a1a010",
        },
      },
      outro: "<p style='color: #333333;'>We thank you for your purchase.</p>",
    },
  };

  let emailBody = mailGenerator.generate(emailContent);

  let mailOptions = {
    from: "tausif@coobizit.com",
    to: userEmail,
    subject: "Your Order Details",
    html: emailBody,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({
      message: "You have an order email",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
