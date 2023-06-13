import mongoose from "mongoose";

// Function to connect to MongoDB
const connectMongodb = async () => {
  try {
    // Connect to MongoDB using the provided MONGODB_URI from environment variables
    const { connection } = await mongoose.connect(process.env.MONGODB_URI);

    // Check if the connection is successful
    if (connection.readyState == 1) {
      // If the connection state is 1 (connected), resolve the promise with true
      return Promise.resolve(true);
    }
  } catch (error) {
    // If there is an error during the connection, reject the promise with the error
    return Promise.reject(error);
  }
};

export default connectMongodb;
