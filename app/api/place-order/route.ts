import { dbConnection } from "@/app/lib/db";
import { bookModel } from "@/model/bookModel";
import { orderModel } from "@/model/oderedModel";
import { NextRequest, NextResponse } from "next/server";

dbConnection();
export async function POST(req: NextRequest) {
  try {
    const { userId, shippingAddress, quantity, title } = await req.json();
    const book = await bookModel.findOne({ title });
    const bookId = book._id;

    await orderModel.create({
      userId,
      shippingAddress,
      quantity,
      bookId,
    });

    return NextResponse.json(
      {
        message: "Order placed successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: `Error occurred during placing order ${error}`,
      },
      {
        status: 500,
      }
    );
  }
}
