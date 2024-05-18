"use client";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

export default function Page() {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      if (response.data.success) {
        toast.success("Login Successful Nafis Ahmed Lets's Add Products", {
          duration: 2000, // Set the duration in milliseconds (e.g., 5000 for 5 seconds)
        });

        setTimeout(() => {
          router.push("Login/CreateItem");
        }, 5000); // Use the same duration as the toast
      } else {
        toast.error("Something Went wrong");
      }
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }

    setUser({
      email: "",
      password: "",
    });
  };
  return (
    <div className="bg-white p-4 min-h-screen flex items-center justify-center">
      <form
        className="rounded ring-4 ring-black ring-opacity-50 flex flex-col items-center justify-center gap-6 sm:p-24 p-6 cursor-pointer bg-gradient-to-r from-purple-200 via-pink-200 to-red-100  divide-y divide-fuchsia-300 min-h-[80vh] sm:min-w-[50vh]"
        onSubmit={handleLogin}
      >
        <p className="text-black font-bold font-mono border">
          {loading ? "Processing" : "Login"}
        </p>
        <input
          className="p-3 border "
          type="email"
          placeholder="Enter email"
          name="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          className="p-3 border"
          type="text"
          placeholder="Enter Password"
          name="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button
          className="h-12 w-20 bg-black text-white rounded font-semibolds"
          type="submit"
        >
          {buttonDisabled ? "Not able to Login" : "Login"}
        </button>
        <a href="/" className="h-6 border text-black font-sans font-semibold">
          Back to the Home
        </a>
        {error && (
          <span className="text-red-500 font-mono ">
            Wrong email or password
          </span>
        )}
      </form>
    </div>
  );
}
