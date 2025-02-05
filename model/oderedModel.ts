import mongoose, { Schema } from "mongoose";

interface IOrder {
  userId: mongoose.Types.ObjectId;
  bookId: mongoose.Types.ObjectId;
  shippingAddress: string;
  quantity:number
}

const orderSchema = new Schema<IOrder>({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  bookId: {
    type: mongoose.Schema.ObjectId,
    ref: "Book",
  },
  quantity: {
    type:Number
  }
});

export const orderModel =  mongoose.models.Order || mongoose.model<IOrder>("Order", orderSchema);
