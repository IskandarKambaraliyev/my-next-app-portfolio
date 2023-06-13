import { Schema, model, models } from "mongoose";

// Define the user schema
const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
});

// Check if the "user" model already exists, otherwise create it
const Users = models.user || model("user", userSchema);

export default Users;
