import React from "react";

export default function Product() {
  const hoichoiItems = [
    {
      type:"Shirt",
      description:"Winter Collection",
      image:"https://richmanbd.com/wp-content/uploads/2023/11/15a-1-768x768.jpg"
  
  },
  {
    type:"Panjabi",
    description:"All type",
    image:"https://www.aarong.com/media/catalog/product/0/0/0040000100050.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=667&width=500&canvas=500:667"
},
{
  type:"Shirt",
  description:"Winter Collection",
  image:"https://richmanbd.com/wp-content/uploads/2023/11/15a-1-768x768.jpg"

},
{
  type:"Shirt",
  description:"Winter Collection",
  image:"https://richmanbd.com/wp-content/uploads/2023/11/15a-1-768x768.jpg"

},
{
  type:"Shirt",
  description:"Winter Collection",
  image:"https://richmanbd.com/wp-content/uploads/2023/11/15a-1-768x768.jpg"

},
{
  type:"Shirt",
  description:"Winter Collection",
  image:"https://richmanbd.com/wp-content/uploads/2023/11/15a-1-768x768.jpg"

},{
  type:"Shirt",
  description:"Winter Collection",
  image:"https://richmanbd.com/wp-content/uploads/2023/11/15a-1-768x768.jpg"

},{
  type:"Shirt",
  description:"Winter Collection",
  image:"https://richmanbd.com/wp-content/uploads/2023/11/15a-1-768x768.jpg"

},{
  type:"Shirt",
  description:"Winter Collection",
  image:"https://richmanbd.com/wp-content/uploads/2023/11/15a-1-768x768.jpg"

}
  ];
  return (
    <div className="pt-2 flex flex-row justify-between flex-wrap gap-5 bg-gray-100 dark:bg-gray-900">
        {/* card starts from here  */}
     {hoichoiItems.map((item)=>(
       <div key={item.type} className="max-w-xs mx-auto p-9 bg-white  rounded-xl shadow-md space-y-6 sm:flex sm:items-center sm:justify-between sm:space-y-2 sm:mx-3 sm:gap-5 sm:max-w-xl">
       <img
         src={item.image}
         alt=""
         className="h-30 mx-auto overflow-hidden sm:mx-0 
         ring-2 ring-purple-500 ring-offset-4 ring-offset-slate-50
          dark:ring-offset-slate-900 transform hover:scale-105 
          duration-500"
       />
       <div className="text-center space-y-3  sm:space-y-5 ">
         <div>
           <p className="text-lg text-black font-semibold">{item.type}</p>
           <p className="text-gray-500 font-medium">{item.description}</p>
         </div>
         <button className="px-4 py-1 text-sm  border border-purple-300 rounded-full text-purple-700  sm:rounded
         hover:bg-purple-500 hover:text-white 
          focus:outline-none
          focus:ring-2
         ">Buy Now!</button>
       </div>
     </div> 
     ))}
    </div>
  );
}
