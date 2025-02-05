import { dbConnection } from "@/app/lib/db";
import { orderModel } from "@/model/oderedModel";
import { NextResponse } from "next/server";

dbConnection();

export async function GET() {
  try {
    const orderList = await orderModel.find({}).populate("userId").populate("bookId");

    return NextResponse.json(orderList, {
      status: 200
    });
  } catch (error) {
    return NextResponse.json({
      message: `Unable to load the List of orders ${error}`
    }, {
      status: 400
    });
  }
}