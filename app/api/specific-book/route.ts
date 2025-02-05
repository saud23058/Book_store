import { NextResponse } from "next/server";
import { dbConnection } from "@/app/lib/db";
import { bookModel } from "@/model/bookModel";
import mongoose from "mongoose";

// Connect to the database
dbConnection();

export async function GET(req: Request) {
  try {
    // Extract query parameters from the URL
    const { searchParams } = new URL(req.url);
    const bookId = searchParams.get("bookId");

    // Check if bookId is provided
    if (!bookId) {
      return NextResponse.json(
        { message: "Book ID is missing" },
        { status: 400 }
      );
    }

    // Validate bookId format
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return NextResponse.json({ message: "Invalid Book ID" }, { status: 400 });
    }

    console.log("Fetching book with ID:", bookId);

    // Fetch the book from the database
    const book = await bookModel.findOne({ _id: bookId });

    // Check if the book exists
    if (!book) {
      return NextResponse.json({ message: "Book not found" }, { status: 404 });
    }

    // Return the book data
    return NextResponse.json(book, { status: 200 });
  } catch (error) {
    console.error("Error fetching book:", error);
    return NextResponse.json(
      { message: `Error occurred during fetching book: ${error}` },
      { status: 500 }
    );
  }
}
