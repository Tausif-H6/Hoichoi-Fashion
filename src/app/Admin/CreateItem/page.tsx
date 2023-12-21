"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { collection, addDoc } from "firebase/firestore"; 
import { ref, uploadBytesResumable, getDownloadURL, UploadTaskSnapshot } from 'firebase/storage';
// Import your Firebase Storage instance
import { db, storage } from '../../firebase';
interface Item {
  name: string;
  size: string;
  price: string;
  description: string;
  picture: File | null;
}

export default function Page() {
    
  const [items, setItems] = useState<Item>({
    name: "",
    size: "",
    price: "",
    description: "",
    picture: null,
  });
  
  // Function to upload file to Firebase Storage and get download URL
const uploadFile = async (file: File): Promise<string> => {
  const storageRef = ref(storage, `images/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on('state_changed',
      (snapshot: UploadTaskSnapshot) => {
        // Track the upload progress if needed
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        // Handle errors
        console.error('Error uploading file:', error);
        reject(error);
      },
      () => {
        // Upload completed successfully, get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          resolve(downloadURL);
        });
      }
    );
  });
};
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
      // Upload file to Firebase Storage and get download URL
      const downloadURL = await uploadFile(items.picture as File);
  
      // Add item to Firestore with download URL
      await addDoc(collection(db, 'hoichoiDB'), {
        name: items.name,
        price: items.price,
        description: items.description,
        image: downloadURL,
      });
  
      // Reset the form after submission
      setItems({
        name: '',
        size: '',
        price: '',
        description: '',
        picture: null,
      });
  
      alert('Image Uploaded');
    } catch (error) {
      console.error('Error adding item to Firestore:', error);
    }
  };
  

  return (
    <div className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
      {/* Add product form */}
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
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
              placeholder="Enter Item Name"
              name="description"
              value={items.description}
              onChange={handleChange}
            />
            {/* ... other input fields ... */}
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture">Picture</Label>
              <Input
                id="picture"
                type="file"
                name="picture"
                onChange={handleChange}
              />
            </div>
            <button
              className="col-span-3 border text-white bg-slate-950 hover:bg-slate-900 p-3 text-xl"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
