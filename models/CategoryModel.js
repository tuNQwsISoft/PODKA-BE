import mongoose from "mongoose";

export const CategorySchema = new mongoose.Schema({
  category: { type: String },
});

export default mongoose.model("Category", CategorySchema);
