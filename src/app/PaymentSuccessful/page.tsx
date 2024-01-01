"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-500 text-white">
      <div className="text-4xl font-bold mb-5">Payment Successful! </div>
      <p className="text-2xl font-semibold mb-4 ">Your Order is onthe way </p>
      <a href="/" className="h-10 border text-white font-sans font-semibold">
        Back to the Home
      </a>
    </div>
  );
}

export default page;
