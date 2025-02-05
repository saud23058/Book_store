import { dbConnection } from "@/app/lib/db";
import { bookModel } from "@/model/bookModel";


import { NextRequest, NextResponse } from "next/server";

dbConnection();

export async function POST(req: NextRequest) {
  try {
    const { title, description } = await req.json();
    console.log(title,description);
    
    if (!title || !description) {
      return NextResponse.json(
        {
          message: "Please enter the fields",
        },
        {
          status: 400,
        }
      );
    }
    await bookModel.create({
      title,
      description,
    });

    

    return NextResponse.json(
      {
        message: "Book successfully created",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: `Error occurred during creating book ${error}`,
      },
      {
        status: 500,
      }
    );
  }
}
