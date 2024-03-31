import mongoose from "mongoose";

export const CommentSchema = new mongoose.Schema({ comment: { type: String } });

export default mongoose.model.Comment ||
        mongoose.model("Comments", CommentSchema);
