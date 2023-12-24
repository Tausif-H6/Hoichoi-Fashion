"use client"
import { useProductContext } from "@/Provider/Context/Product.context";
import React, { useEffect, useState } from "react";
interface Product {
  id: string;
  name: string;
  description: string;
  size: string;
  price: number;
  image: string;
}
export default function Product() {
  const {getAllProducts,addTocartHandeler,cart } = useProductContext();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const productsData = await getAllProducts();
      console.log("ProductData",productsData);
      
      setProducts(productsData);
    };

    fetchData();
  }, [getAllProducts]);
  console.log("Products",products);
 
  return (
    <div className="pt-2 flex flex-row justify-between flex-wrap gap-5 bg-transparent dark:bg-gray-900">
        {/* card starts from here  */}
        {products.map((item:Product)=>(
       <div key={item.id} className="max-w-xs mx-auto p-9 bg-white  rounded-xl shadow-md space-y-6 sm:flex  sm:justify-between sm:space-y-2 sm:mx-3 sm:gap-5 sm:max-w-2xl">
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
           <p className="text-lg text-black font-semibold">{item.name}</p>
           <p className="text-gray-500 font-medium">{item.description}</p>
           <p>Available Sizes: {item.size}</p>
           <p>Price :{item.price}</p>
         </div>
         <button className="px-4 py-1 text-sm  border border-purple-300 rounded-full text-purple-700  sm:rounded
         hover:bg-purple-500 hover:text-white 
          focus:outline-none
          focus:ring-2
         "
         onClick={()=>addTocartHandeler(item)}
         >Add to cart!</button>
       </div>
     </div> 
     ))}
    </div>
  );
}
