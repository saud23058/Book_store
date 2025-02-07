"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      setError("");
      const res = await axios.post(`http://localhost:3000/api/auth/signup`, {
        email,
        password,
        username,
      });

      if (res.status === 200) {
        router.push("/");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Something went wrong");
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-80 h-auto pt-8 px-4 text-center border-2 border-solid rounded-xl shadow-md">
        <h1 className="text-2xl font-bold pt-8">Create your account</h1>
        <div className="flex flex-col gap-2 mt-4">
          <label className="flex font-semibold" htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            placeholder="Enter your email"
            className="border border-gray-400 p-2 rounded-md"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="flex font-semibold" htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            className="border border-gray-400 p-2 rounded-md"
            onChange={(e) => setUsername(e.target.value)}
          />

          <label className="flex font-semibold" htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="border border-gray-400 p-2 rounded-md"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <button
          onClick={handleLogin}
          className="w-full mt-4 bg-black mb-2 p-2 text-white font-bold rounded-md"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Page;
