import React from 'react'

export default function page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-orange-500 text-white">
      <div className="text-4xl font-bold mb-5">Sorry !! Payment Canceled </div>
      <p className="text-2xl font-semibold mb-4 ">Order once again </p>
      <a href="/" className="h-10 border text-white font-sans font-semibold">
        Back to the Home
      </a>
    </div>
  )
}
