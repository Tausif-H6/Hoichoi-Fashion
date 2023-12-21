"use client";
import { createContext, useContext } from "react";
import {  setDoc,doc, collection} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/app/firebase";
import {v4 as uuid} from "uuid"
import { getDocs } from "firebase/firestore";

export const ProductContext = createContext();

export const useProductContext = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const addProductHandler = async (product) => {
    try {
      // Upload file to Firebase Storage and get download URL
      const downloadURL = await uploadFile(product.picture);
      // Add product to Firestore with download URL
      await setDoc(doc(db, "hoichoiDB",uuid()), {
        name: product.name,
        price: product.price,
        size: product.size,
        description: product.description,
        image: downloadURL,
      });

    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const uploadFile = async (file) => {
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Track the upload progress if needed
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          // Handle errors
          console.error("Error uploading file:", error);
          reject(error);
        },
        () => {
          // Upload completed successfully, get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            resolve(downloadURL);
          });
        }
      );
    });
  };

  //get all products

 const getAllProducts = async () => {
   try {
     const querySnapshot = await getDocs(collection(db, "hoichoiDB"));
     const productsData = querySnapshot.docs.map((doc) => ({
       id: doc.id,
       ...doc.data(),
     }));
     console.log("All products", productsData);
     return productsData;
   } catch (error) {
     console.error("Error getting all products:", error);
   }
 };


  return (
    <ProductContext.Provider value={{ addProductHandler,getAllProducts }}>
      {children}
    </ProductContext.Provider>
  );
};
