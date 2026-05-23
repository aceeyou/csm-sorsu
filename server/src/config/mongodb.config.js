import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      process.env.MONGO_CONNECTION_STRING,
    );
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
