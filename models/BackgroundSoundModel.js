import mongoose from "mongoose";

export const BackgroundSoundSchema = new mongoose.Schema({
  url: { type: String },
  name: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  public: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const BackgroundSound = mongoose.model(
  "BackgroundSound",
  BackgroundSoundSchema
);
