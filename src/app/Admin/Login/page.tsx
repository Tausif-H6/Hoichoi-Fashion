"use client";
import { auth } from "@/app/firebase";
import React, { FormEvent, useState } from "react";
import { signInWithEmailAndPassword} from "firebase/auth";
import { useRouter } from 'next/navigation'
import CreateItem from "../CreateItem/page";

export default function Page(){
  const router = useRouter()
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
const [password, setPassword] = useState("");


  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(auth);
    
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        router.push('/Admin/CreateItem')
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
        className="flex flex-col items-center justify-center gap-6 sm:p-24 p-6 cursor-pointer bg-yellow-100"
        onSubmit={handleLogin}
      >
        <p>Login Page of Hoichoi Fashion Admin</p>
        <input
          className="p-3 border"
          type="email"
          placeholder="Enter email"
          name="email"
          onChange={e=>setEmail(e.target.value)}
        />
        <input
          className="p-3 border"
          type="text"
          placeholder="Enter Password"
          name="password"
          onChange={e=>setPassword(e.target.value)}
        />
        <button
          className="p-3  bg-black text-white font-semibolds"
          type="submit"
        >
          Login
        </button>
        {error && (
          <span className="text-red-500 font-mono ">
            Wrong email or password
          </span>
        )}
      </form>
    </div>
  );
}
