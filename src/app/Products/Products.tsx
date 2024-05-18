"use client";
import { useProductContext } from "@/Provider/Context/Product.context";
import React, { useEffect, useState } from "react";

import axios from "axios";
interface Product {
  id: string;
  name: string;
  description: string;
  size: string;
  price: number;
  picture: string;
}
import Loader from "@/components/loader/loader";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function Product() {
  const router = useRouter();
  const { getAllProducts, addTocartHandeler, cart, products, setProducts } =
    useProductContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true when starting to fetch data
        // const productsData = await getAllProducts();
        const productsData = await axios.get("/api/product/get");
        console.log("ProductData", productsData);
        setProducts(productsData.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Set loading to false when data fetching is complete
      }
    };

    fetchData();
  }, [setProducts]);
  console.log("Products", products);
  const naviageteTotheSingleProduct = (product: any) => {
    console.log("routing product", product);

    router.push(`/Products/${product._id}`);
  };
  return (
    <div className="pt-2 pb-2 flex flex-row justify-between flex-wrap gap-5 bg-transparent dark:bg-gray-900 ">
      {loading ? (
        // Display loading state while fetching data
        <Loader />
      ) : (
        // Display products when data fetching is complete
        products.map((item: any) => (
          <div
            key={item._id}
            className="max-w-xs mx-auto p-9 bg-white rounded-xl shadow-md space-y-6 sm:flex sm:justify-between sm:space-y-2 sm:mx-3 sm:gap-5 sm:max-w-2xl"
          >
            <Image
              src={item.picture}
              alt=""
              width={200}
              height={200}
              className="h-30 mx-auto overflow-hidden sm:mx-0 ring-2 ring-purple-500 ring-offset-4 ring-offset-slate-50 dark:ring-offset-slate-900 transform hover:scale-105 duration-500"
            />
            <div className="text-center space-y-3  sm:space-y-5 ">
              <div>
                <p className="text-lg text-black font-semibold">{item.name}</p>
                <p className="text-gray-500 font-medium">{item.description}</p>
                <p>Available Sizes: {item.size}</p>
                <p>Price :{item.price}</p>
              </div>
              <button
                className="px-4 py-1 text-sm border border-purple-300 rounded-full text-purple-700  sm:rounded hover:bg-purple-500 hover:text-white focus:outline-none focus:ring-2"
                onClick={() => naviageteTotheSingleProduct(item)}
              >
                View Product
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
