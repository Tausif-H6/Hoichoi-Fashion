"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { setDoc, doc, collection } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/app/firebase";
import { v4 as uuid } from "uuid";
import { getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";

export const ProductContext = createContext();

export const useProductContext = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const router = useRouter();
  const [cart, setcart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [products, setProducts] = useState([]);

  console.log(`cart`, cart);

  const addProductHandler = async (product) => {
    try {
      // Upload file to Firebase Storage and get download URL
      const downloadURL = await uploadFile(product.picture);
      // Add product to Firestore with download URL
      await setDoc(doc(db, "hoichoiDB", uuid()), {
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
      return productsData;
    } catch (error) {
      console.error("Error getting all products:", error);
    }
  };
  // Add to cart
  const addTocartHandeler = (product) => {
    setcart([...cart, product]);
  };
  //Remove prodcut from the cart
  const removeFromCartHandler = (cartItemId) => {
    const updatedCart = cart.filter((item) => item.id !== cartItemId);
    setcart(updatedCart);
  };

  useEffect(() => {
    const calculatedTotalPrice = cart.reduce(
      (accumulator, item) => accumulator + item.totalPrice,
      0
    );
    setTotalPrice(calculatedTotalPrice);
  }, [cart]);

  // make payment injecting a custom payload information

  const makePayment = async () => {
    try {
      // You can include other necessary information in the payload
      const paymentPayload = {
        cart,
        totalPrice,
        // Add other necessary information
      };

      // Call the API to initialize payment
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentPayload),
      });
      const responseData = await response.json();
      console.log("Payment response ", response);
      if (
        responseData &&
        responseData.data &&
        responseData.data.GatewayPageURL
      ) {
        // Redirect the user to the payment gateway
        router.push(responseData.data.GatewayPageURL);
      } else {
        console.error("Invalid response from payment initialization API");
        // Handle the case where the response does not contain the expected data
      }
    } catch (error) {
      console.error("Error making payment:", error);
      // Handle unexpected errors
    }
  };
  return (
    <ProductContext.Provider
      value={{
        addProductHandler,
        getAllProducts,
        addTocartHandeler,
        cart,
        removeFromCartHandler,
        totalPrice,
        makePayment,
        uploadFile,
        products,
        setProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
