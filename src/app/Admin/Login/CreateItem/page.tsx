"use client";
import React, { useState, ChangeEvent, useRef, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import Loader from "../../../../components/loader/loader";
import toast from "react-hot-toast";
import axios from "axios";
import Link from "next/link";
import { useProductContext } from "@/Provider/Context/Product.context";
interface Item {
  name: string;
  size: string;
  price: string;
  description: string;
  picture: string;
  product_category: string;
}
interface UserData {
  _id: string;
}

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { addProductHandler , uploadFile} = useProductContext();
  const [userData, setUserData] = React.useState<UserData | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<Item>({
    name: "",
    size: "",
    price: "",
    description: "",
    picture: "",
    product_category: "",
  });
                  /*   Firebase  setup */
  // Function to upload file to Firebase Storage and get download URL
  // const handleChange = (
  //   e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  // ) => {
  //   const { name, value } = e.target;
  
  //   if (name === "picture") {
  //     const fileInput = e.target as HTMLInputElement;
  //     const file = fileInput.files?.[0] || null;
  
  //     setItems((prevItems) => ({
  //       ...prevItems,
  //       [name]: file,
  //     }));
  //   } else {
  //     setItems((prevItems) => ({
  //       ...prevItems,
  //       [name]: value,
  //     }));
  //   }
  // };
  const handleImageChange = async(e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // const imgurl = URL.createObjectURL(file);//Mendatory to submit a picture
      const imageFromFirebaseStore = await uploadFile(file);
      setItems({ ...items, picture: imageFromFirebaseStore });
      // You can also set the image URL in the state if needed
      // setImage(imgurl);
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
  
      const requestData = {
        name: items.name,
        size: items.size,
        price: items.price,
        description: items.description,
        product_category: items.product_category,
        picture: items.picture // Assuming items.picture is a URL string
      };
  
      console.log("requestData", requestData);
  
      const response = await axios.post("/api/product/create", requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      // Check if the response is successful (status code in the range 200-299)
      if (response.status >= 200 && response.status < 300) {
        // Assuming your server is returning JSON, you can access the data like this
        const responseData = response.data;
        console.log("Api response", responseData);
  
        // Reset the form after submission
        setItems({
          name: "",
          size: "",
          price: "",
          description: "",
          picture: "",
          product_category: "",
        });
  
        // Reset the file input value
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
  
        toast.success("Product Added");
      } else {
        // Handle error, if the status code is not in the success range
        console.error("Error adding item to database:", response.statusText);
        toast.error("Failed to add product");
      }
    } catch (error: any) {
      // Handle network or other errors
      console.error("Error adding item to database:", error);
      toast.error(`Failed to add product: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  

  const handleLogout = async () => {
    try {
      const response = await axios.get("/api/users/logout"); // Notice the '/' at the beginning
      console.log(response);
      if (response.data.success) {
        router.push("/");
      }
    } catch (error: any) {
      console.log("Logout failed", error.message);
      toast.error(error.message);
    }
  };

  React.useEffect(() => {
    const getUserDetails = async () => {
      try {
        const res = await axios.get("/api/users/me");
        setUserData(res.data.data);
      } catch (error: any) {
        console.error("Error fetching user details:", error.message);
      }
    };
    // Call the function when the component mounts
    getUserDetails();
  }, []);

  console.log("user Data", userData?._id);

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
          <Link
            href={`/Admin/Login/CreateItem/${userData?._id}`}
            className="ml-5 p-2 bg-green-400 rounded"
          >
            {" "}
            See Profile{" "}
          </Link>
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
                onChange={(e)=> setItems({...items,name:e.target.value})}
              />
              <input
                className="col-span-3 p-3 border"
                type="text"
                placeholder="Enter Item Price"
                name="price"
                value={items.price}
                onChange={(e)=> setItems({...items,price:e.target.value})}
              />
              <input
                className="col-span-3 p-3 border"
                type="text"
                placeholder="Enter Item Size"
                name="size"
                value={items.size}
                onChange={(e)=> setItems({...items,size:e.target.value})}
              />
              <input
                className="col-span-3 p-3 border"
                type="text"
                placeholder="Enter Item Category"
                name="product_category"
                value={items.product_category}
                onChange={(e)=> setItems({...items,product_category:e.target.value})}
              />
              <input
                className="col-span-3 p-3 border"
                type="text"
                placeholder="Enter Product description"
                name="description"
                value={items.description}
                onChange={(e)=> setItems({...items,description:e.target.value})}
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
                  onChange={handleImageChange}
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
