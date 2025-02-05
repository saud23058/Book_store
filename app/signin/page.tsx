"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 

  const router = useRouter();

  const handleLogin = async () => {
 

      console.log(email,password);
      

    
    try {
      setError("")
    const res = await axios.post("http://localhost:3000/api/auth/signin", {
      email,
      password
    })
      
      if (res.status == 200) {
        router.push('/')
      }
      else if (res.status == 404) {
        setError("User not found or Invalid credentials")
      } else if (res.status == 400) {
        setError("Please enter the correct fields")
      }
      
    } catch (error:any) {
      setError(`Something went wrong ${error.message}`)
    }

   
    

  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-80 h-auto pt-8 px-4 text-center border-2 border-solid rounded-xl shadow-md">
        <h1 className="text-2xl font-bold pt-8">Welcome back</h1>
        <div className="flex flex-col gap-2 mt-4">
          <label className="flex font-semibold">Email</label>
          <input
            type="text"
            placeholder="Enter your email"
            className="border border-gray-400 p-2 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          

          <label className="flex font-semibold">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="border border-gray-400 p-2 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        
        </div>
        <p className="text-red-500 text-sm">{error }</p>
        <button
          onClick={handleLogin}
          className="w-full mt-4 mb-2 bg-black p-2 text-white font-bold rounded-md"
        >
          Log in
        </button>
      </div>
    </div>
  );
};

export default Page;
