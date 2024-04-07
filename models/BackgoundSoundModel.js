import mongoose from "mongoose";
import { CategorySchema } from "./CategoryModel.js";

export const BackgroundSoundSchema = new mongoose.Schema({
  name: { type: String },
});

export const BackgroundSound = mongoose.model(
  "BackgroundSound",
  BackgroundSoundSchema,
);
