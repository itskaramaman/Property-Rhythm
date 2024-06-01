import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  // if database is already connected, don't connect again
  if (connected) {
    console.log("MongoDB is already connected");
    return;
  }
  try {
    mongoose.connect(process.env.MONGODB_URI!);
    connected = true;
    console.log("MongoDB connected");
  } catch (error: any) {
    console.log(error.message);
  }
};

export default connectDB;
