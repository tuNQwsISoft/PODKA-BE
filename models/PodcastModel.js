import mongoose from "mongoose";

export const PodcastSchema = new mongoose.Schema({
  name: { type: String, required: true },
  podcast: { type: String, required: true },
  desc: { type: String },
  like: { type: Number, default: 0 },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  comment: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
  backgroundSound: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BackgroundSound",
  },
  backgroundImage: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
});

export default mongoose.model.Podcast ||
  mongoose.model("Podcast", PodcastSchema);
