import { connect } from "@/dbConfig/dbConfig";
import nodemailer from "nodemailer";
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

  const transporter = nodemailer.createTransport(config);

  const generateCartTable = (cartItems) => {
    let tableContent = cartItems
      .map(
        (item) =>
          `<tr>
        <td>${item.item.description} (${item.selectedSize})</td>
        <td>${item.quantity}</td>
        <td style="color: #d946ef; text-align: right;">$${item.totalPrice.toFixed(
          2
        )}</td>
      </tr>`
      )
      .join("");

    return `
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th style="text-align: left; padding: 8px;">Item</th>
            <th style="text-align: left; padding: 8px;">Quantity</th>
            <th style="text-align: right; padding: 8px;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${tableContent}
        </tbody>
      </table>`;
  };

  const emailBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <title>Your Order Details</title>
    </head>
    <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
      <div style="max-width: 600px; margin: auto; padding: 20px; background-color: #ffffff; border-radius: 8px;">
        <h2 style="color: #333333;">Your order has been processed successfully.</h2>
        ${generateCartTable(cart)}
        <p style="color: #333333;">You can check the status of your order and more in your dashboard:</p>
        <a href="https://mailgen.js/confirm?s=d9729feb74992cc3482b350163a1a010" 
           style="display: inline-block; padding: 10px 20px; color: #ffffff; background-color: #3869D4; text-decoration: none; border-radius: 4px;">
          Go to Dashboard
        </a>
        <p style="color: #333333;">We thank you for your purchase.</p>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
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
