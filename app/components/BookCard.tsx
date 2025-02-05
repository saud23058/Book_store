import Link from 'next/link';
import React from 'react';

interface BookCardProps {
  title: string;
  description: string;
  id:string
}

const BookCard: React.FC<BookCardProps> = ({ title, description, id }) => {  
  return (
    <div className='bg-blue-300 w-[200px] h-[200px] mt-8 rounded-md flex flex-col justify-center items-center'>
      <h1 className='text-xl font-bold'>{title}</h1>
      <p className='mt-4 mx-3 text-gray-700'>{description}</p>
      <Link href={`/book/${id}`}><button className='mt-2 bg-blue-700 p-2 rounded-md text-white' >Explore</button></Link>
    </div>
  );
};

export default BookCard;
