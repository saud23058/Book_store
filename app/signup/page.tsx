"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-80 h-96 pt-8 px-4 text-center border-2 border-solid rounded-xl shadow-md">
        <h1 className="text-2xl font-bold pt-8">Create your account</h1>
        <div className="flex flex-col gap-2 mt-4">
          <label className="flex font-semibold" htmlFor="username">
            Email
          </label>
          <input
            type="text"
            name="username"
            placeholder="Enter your email"
            className="border border-gray-400 p-2 rounded-md"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label className="flex font-semibold" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            className="border border-gray-400 p-2 rounded-md"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />

          <label className="flex font-semibold" htmlFor="username">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="border border-gray-400 p-2 rounded-md"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button
          onClick={async () => {
            await axios.post("http://localhost:3000/api/auth/signup", {
              email,
              password,
              username,
            });
            router.push("/");
          }}
          className="w-full mt-4 bg-black  p-2 text-white font-bold rounded-md "
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Page;
