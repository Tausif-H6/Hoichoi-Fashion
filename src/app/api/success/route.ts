import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    return NextResponse.redirect(new URL('/PaymentSuccessful', req.url),303);
}