import axios from "axios";
import Link from "next/link";

interface Book {
  title: string;
  description: string;
}

interface PageProps {
  params: {
    id: string;
  };
}


const Page = async ({ params }: PageProps) => {
  const bookId = params.id;

  try {
    const res = await axios.get<Book>(
      ` http://localhost:3000/api/specific-book?bookId=${bookId}`
    );
    const book = res.data;

    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
              {book.title}
            </h1>
            <p className="text-lg text-gray-700 mb-6 text-center">
              {book.description}
            </p>
            <div className="flex justify-center">
              <Link href="/place-order">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
                  Order Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching book:", error);
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg overflow-hidden p-6">
          <h1 className="text-3xl font-bold text-red-600 mb-4 text-center">
            Error
          </h1>
          <p className="text-lg text-gray-700 text-center">
            Failed to fetch book details. Please try again later.
          </p>
        </div>
      </div>
    );
  }
};

export default Page;