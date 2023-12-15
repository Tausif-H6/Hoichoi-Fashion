import React from "react";

export default function Product() {
  return (
    <div className="pt-2 flex flex-row justify-between flex-wrap gap-5 bg-gray-100 dark:bg-gray-900">
        {/* card starts from here  */}
      <div className="max-w-xs mx-auto p-9 bg-white  rounded-xl shadow-md space-y-6 sm:flex sm:items-center sm:justify-between sm:space-y-2 sm:mx-3 sm:gap-5 sm:max-w-xl">
        <img
          src="https://thumbs.dreamstime.com/b/clothing-rack-15819472.jpg"
          alt=""
          className="h-30 mx-auto overflow-hidden sm:mx-0 
          ring-2 ring-purple-500 ring-offset-4 ring-offset-slate-50
           dark:ring-offset-slate-900 transform hover:scale-105 
           duration-500"
        />
        <div className="text-center space-y-3  sm:space-y-5 ">
          <div>
            <p className="text-lg text-black font-semibold">Shirt</p>
            <p className="text-gray-500 font-medium">Winter collection</p>
          </div>
          <button className="px-4 py-1 text-sm  border border-purple-300 rounded-full text-purple-700  sm:rounded
          hover:bg-purple-500 hover:text-white 
           focus:outline-none
           focus:ring-2
          ">Buy Now!</button>
        </div>
      </div> 
    </div>
  );
}
