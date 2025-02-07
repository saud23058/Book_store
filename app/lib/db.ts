import mongoose from "mongoose";

export async function dbConnection() {
  try {
    await mongoose.connect(process.env.DB_URL!)
      .then(() => {
        console.log("DB is connected Successfully");
        
      });
  } catch {
    process.exit(1);
  }
}
