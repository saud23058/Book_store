"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import BookCard from "./components/BookCard";
import Link from "next/link";

interface Book {
  title: string;
  description: string;
  _id: string;
}

const Home = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/all-books`);
        console.log(response.data);
        
        setBooks(response.data.books);
      } catch  {
        setError("Failed to load books.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center mt-28">
      <div>
        <h1 className="text-[50px] font-bold">
          Welcome to <span className="text-blue-500">Book Store.</span>
        </h1>
      </div>
      <p className="text-xl font-bold mt-8 text-gray-400">Available Books</p>

      {loading ? (
        <p>Loading books...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="flex gap-4 mx-4">
          {books.map((book) => (
            <BookCard key={book._id} title={book.title} description={book.description} id={book._id} />
          ))}
        </div>
      )}

      <Link href="/create-book">
        <button className="mt-4 bg-black p-3 text-white rounded-lg font-semibold">
          Create New Book
        </button>
      </Link>
    </div>
  );
};

export default Home;
