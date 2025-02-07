"use client"
import axios from "axios";
import React, { useState } from "react";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handler = async () => {
    setError("")
    try {
  
      const res = await axios.post(`${process.env.BASE_URL}http://localhost:3000/api/new-book`,{
        title,
        description
      })
      if (res.status === 200) {
        alert("Successfully Created book")
      }
    } 
    catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Something went wrong");
      } else {
        setError("Something went wrong");
      }
    }

  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[500px] h-[500px] bg-blue-500 rounded-lg flex flex-col items-center pt-20">
        <label className="my-2 text-xl text-white font-semibold" htmlFor="title">Title</label>
        <input onChange={(e) => {
          setTitle(e.target.value)
        }} className="w-[230px] p-2 rounded-md mt-2" type="text" name="title" placeholder="Enter title" />
        <label className=" text-xl text-white font-semibold my-3" htmlFor="description">Description</label>
        <textarea onChange={(e) => {
          setDescription(e.target.value)
        }} className="text-sm w-[230px] rounded-md p-2" placeholder="Write your description here" name="description" id=""></textarea>
        <button onClick={handler} className="text-white bg-black rounded-md p-3 m-3">Create</button>
        <p className="text-red-500">{ error}</p>
      </div>
    </div>
  );
};

export default CreateBook;
