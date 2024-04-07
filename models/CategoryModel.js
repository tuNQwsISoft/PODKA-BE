import mongoose from "mongoose";

export const CategorySchema = new mongoose.Schema({
  category: { type: String },
});

export const Category = mongoose.model("Category", CategorySchema);
