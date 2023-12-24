"use client";
import { auth } from "@/app/firebase";
import React, { FormEvent, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Page() {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("AuthDetauls", auth);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log("User", user);
        console.log(user.uid);
        if (user.uid) {
          toast.success("Login Successful Tusher Lets's Add Products", {
            duration: 5000, // Set the duration in milliseconds (e.g., 5000 for 5 seconds)
          });
        
          setTimeout(() => {
            router.push("Login/CreateItem");
          }, 5000); // Use the same duration as the toast
        } else {
          toast.error("Something Went wrong");
        }
        
              
        
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        console.log(errorCode);

        setError(true);
        setEmail("");
        setPassword("");
        // ..
      });
  };
  return (
    <div className="bg-white p-4 min-h-screen flex items-center justify-center">
      <form
        className="rounded ring-4 ring-black ring-opacity-50 flex flex-col items-center justify-center gap-6 sm:p-24 p-6 cursor-pointer bg-gradient-to-r from-purple-200 via-pink-200 to-red-100  divide-y divide-fuchsia-300 min-h-[80vh] sm:min-w-[50vh]"
        onSubmit={handleLogin}
      >
        <p className="text-black font-bold font-mono border">Only for Admin</p>
        <input
          className="p-3 border "
          type="email"
          placeholder="Enter email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="p-3 border"
          type="text"
          placeholder="Enter Password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="h-12 w-20 bg-black text-white rounded font-semibolds"
          type="submit"
        >
          Login
        </button>
        <a href="/" className="h-6 border text-black font-sans font-semibold">Back to the Home</a>
        {error && (
          <span className="text-red-500 font-mono ">
            Wrong email or password
          </span>
        )}
      </form>
    </div>
  );
}
