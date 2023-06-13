import { MongoClient } from "mongodb";

// Check if the required environment variable MONGODB_URI is missing or invalid
if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

// Retrieve the MongoDB URI and options from environment variables
const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

// Check the Node environment to determine the execution mode
if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable to preserve the client connection
  if (!global._mongoClientPromise) {
    // Create a new MongoClient instance with the URI and options
    client = new MongoClient(uri, options);
    // Connect to the MongoDB server and store the promise in the global variable
    global._mongoClientPromise = client.connect();
  }
  // Retrieve the client promise from the global variable
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, create a new MongoClient instance for each request
  client = new MongoClient(uri, options);
  // Connect to the MongoDB server and store the promise
  clientPromise = client.connect();
}

// Export the clientPromise as the default export of the module
export default clientPromise;
