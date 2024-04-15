import mongoose from "mongoose";

const options = {
  dbName: "TheAddictiveMedia",
};

const connectDB = async (databaseURL) => {
  try {
    // Connect to MongoDB
    await mongoose.connect(databaseURL, options);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectDB;
