import React from "react";

export default function Product() {
  return (
    <div className="pt-2 flex flex-row justify-between flex-wrap gap-5 bg-gray-100">
      <div className="max-w-sm mx-auto p-9 bg-white  rounded-xl shadow-md space-y-6">
        <img
          src="https://thumbs.dreamstime.com/b/clothing-rack-15819472.jpg"
          alt=""
          className="h-30 mx-auto overflow-hidden "
        />
        <div className="text-center space-y-3">
          <div>
            <p className="text-lg text-black font-semibold">Hoichoi choluk</p>
            <p className="text-gray-500 font-medium">Pinik hokm onk</p>
          </div>
          <button className="px-4 py-1 text-sm  border border-purple-300 rounded-full text-purple-700">Visit Hoichoi Fashion</button>
        </div>
      </div>
      
    </div>
  );
}
