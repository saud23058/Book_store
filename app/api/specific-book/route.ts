import { NextResponse } from "next/server";
import { dbConnection } from "@/app/lib/db";
import { bookModel } from "@/model/bookModel";
import mongoose from "mongoose";

// Connect to the database
dbConnection();

export async function GET(req: Request) {
  try {
   
    const { searchParams } = new URL(req.url);
    const bookId = searchParams.get("bookId");

  
    if (!bookId) {
      return NextResponse.json(
        { message: "Book ID is missing" },
        { status: 400 }
      );
    }

   
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return NextResponse.json({ message: "Invalid Book ID" }, { status: 400 });
    }

   

    
    const book = await bookModel.findOne({ _id: bookId });

  
    if (!book) {
      return NextResponse.json({ message: "Book not found" }, { status: 404 });
    }

    return NextResponse.json(book, { status: 200 });
  } catch (error) {

    return NextResponse.json(
      { message: `Error occurred during fetching book: ${error}` },
      { status: 500 }
    );
  }
}
