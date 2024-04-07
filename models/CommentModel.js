import mongoose from "mongoose";

export const CommentSchema = new mongoose.Schema({ comment: { type: String } });

export default mongoose.model("Comment", CommentSchema);
