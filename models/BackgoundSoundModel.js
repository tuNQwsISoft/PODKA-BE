import mongoose from "mongoose";

export const BackgroundSoundSchema = new mongoose.Schema({
  name: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
});

export const BackgroundSound = mongoose.model(
  "BackgroundSound",
  BackgroundSoundSchema,
);
