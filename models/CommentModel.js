import mongoose from "mongoose";

export const CommentSchema = new mongoose.Schema({
  comment: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
});

export default mongoose.model("Comment", CommentSchema);
