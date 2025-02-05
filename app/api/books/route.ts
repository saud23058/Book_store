import { dbConnection } from "@/app/lib/db";
import { bookModel } from "@/model/bookModel";
import { NextResponse } from "next/server";

dbConnection();

export async function GET() {
  try {
    const books = await bookModel.find({});
    return NextResponse.json(books, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: `Unable to load the list of books ${error}`,
      },
      {
        status: 400,
      }
    );
  }
}
