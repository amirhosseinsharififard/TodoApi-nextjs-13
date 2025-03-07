import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connect DB");
  } catch (err) {
    console.log("Error in connecting to DB");
  }
};
export default connectDB;
