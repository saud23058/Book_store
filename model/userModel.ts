import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  email: string;
  username: string;
  password: string;
 
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    unique: true,
    required: true,
  },
});

export const userModel =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
