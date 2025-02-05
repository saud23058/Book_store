import mongoose, { Schema } from "mongoose";

interface IBook {
  title: string;
  description: string;
}

const bookSchema = new Schema<IBook>({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

export const bookModel = mongoose.models.Book || mongoose.model<IBook>("Book", bookSchema);
