import axios from 'axios'
import React from 'react'
import BookCard from './components/BookCard';
import Link from 'next/link';

interface book{
  title: string,
  description: string
  _id:string
}
async function getAllBooks() {
 const response = await axios.get("http://localhost:3000/api/all-books");
return response.data.books
}


const Home = async() => {
  const data = await getAllBooks()  
  
  return (
    <div className='w-full h-full flex flex-col justify-center items-center mt-28'>
      <div>
      <h1 className='text-[50px] font-bold'>Welcome to <span className='text-blue-500'>Book store.</span></h1>
      </div>
      <p className='text-xl font-bold mt-8 text-gray-400'>Available Books</p>
      <div className='flex gap-4 mx-4'>
        {data.map((book:book) => (
          <BookCard key={book._id} title={book.title} description={book.description} id={book._id} />
        ))}
      </div>
      <Link href="/signin">
      <button>Signin</button>
      </Link>
    </div>
  )
}

export default Home
