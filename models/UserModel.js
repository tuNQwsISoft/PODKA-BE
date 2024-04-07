import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
  full_name: String,
  email: String,
  password: String,
});

export default mongoose.model("Users", UserSchema);
