"use client";
import React, { useState, ChangeEvent, useRef, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useProductContext } from "@/Provider/Context/Product.context";
import Loader from "../../../../components/loader/loader";
import toast from "react-hot-toast";
import axios from "axios";
interface Item {
  name: string;
  size: string;
  price: string;
  description: string;
  picture: File | null;
}

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { addProductHandler, getAllProducts } = useProductContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<Item>({
    name: "",
    size: "",
    price: "",
    description: "",
    picture: null,
  });

  // Function to upload file to Firebase Storage and get download URL
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "picture") {
      const fileInput = e.target as HTMLInputElement;
      const file = fileInput.files?.[0] || null;

      setItems((prevItems) => ({
        ...prevItems,
        [name]: file,
      }));
    } else {
      setItems((prevItems) => ({
        ...prevItems,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (
        !items.name ||
        !items.size ||
        !items.price ||
        !items.description ||
        !items.picture
      ) {
        throw new Error("Please fill out all fields before submitting.");
      }
      setLoading(true);
      await addProductHandler(items);
      // Reset the form after submission
      setItems({
        name: "",
        size: "",
        price: "",
        description: "",
        picture: null,
      });
      // Reset the file input value
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      toast.success("Product Added");
    } catch (error: any) {
      toast.error(error.message);
      console.error("Error adding item to Firestore:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get('/api/users/logout');  // Notice the '/' at the beginning
      console.log(response);
      if (response.data.success) {
        router.push("/");
      }
    } catch (error: any) {
      console.log("Logout failed", error.message);
      toast.error(error.message);
    }
  };
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
      {loading ? (
        <Loader />
      ) : (
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
          <button
            className="h-8 w-20 bg-black text-white rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
          <h1 className="text-4xl p-4 text-center">Welcome Tusher</h1>
          <div className="bg-red-100 p-4 rounded-lg">
            <form
              className="grid grid-cols-1 gap-5 items-center text-black"
              onSubmit={handleSubmit}
            >
              <input
                className="col-span-3 p-3 border"
                type="text"
                placeholder="Enter Item Name"
                name="name"
                value={items.name}
                onChange={handleChange}
              />
              <input
                className="col-span-3 p-3 border"
                type="text"
                placeholder="Enter Item Price"
                name="price"
                value={items.price}
                onChange={handleChange}
              />
              <input
                className="col-span-3 p-3 border"
                type="text"
                placeholder="Enter Item Size"
                name="size"
                value={items.size}
                onChange={handleChange}
              />
              <input
                className="col-span-3 p-3 border"
                type="text"
                placeholder="Enter Product description"
                name="description"
                value={items.description}
                onChange={handleChange}
              />
              {/* ... other input fields ... */}
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="picture">
                  Picture <span className="text-red-600">***</span>
                </Label>
                <Input
                  id="picture"
                  type="file"
                  name="picture"
                  ref={fileInputRef}
                  onChange={handleChange}
                />
              </div>
              <button
                className="col-span-3 border text-white bg-slate-950 hover:bg-slate-900 p-3 text-xl rounded"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
