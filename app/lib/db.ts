import mongoose from "mongoose";

export async function dbConnection() {
  try {
    await mongoose.connect(process.env.DB_URL!)
      .then(() => {
        console.log("DB is connected Successfully");
        
      });
  } catch (error) {
    console.log("Error occurred :--", error);
    process.exit(1);
  }
}
