import { dbConnection } from "@/app/lib/db";
import { bookModel } from "@/model/bookModel";
import { orderModel } from "@/model/oderedModel";
import { verifyToken } from "@/app/lib/token";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

dbConnection();
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { shippingAddress, quantity, title } = body;

    const cookieStore =await cookies();
    const token = cookieStore.get("authToken")?.value;
    if (!token) {
      return NextResponse.json({
        message: "Authentication token is missing"
      }, {
        status: 401
      });
    }

    const decoded = verifyToken(token);
    const userId = decoded.userId;

    const book = await bookModel.findOne({ title });
    const bookId = book._id;

    await orderModel.create({
      userId,
      shippingAddress,
      quantity,
      bookId,
    });

    return NextResponse.json({
      message: "Order placed successfully",
    }, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: `Error occurred during placing order ${error}`,
    }, {
      status: 500,
    });
  }
}
