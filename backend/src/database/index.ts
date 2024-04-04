import mongoose from "mongoose";

export default async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Successfully connected to MongoDB Database.");
  } catch (err) {
    console.warn("Error connecting to MongoDB Database.");
    console.log(err);
  }
}