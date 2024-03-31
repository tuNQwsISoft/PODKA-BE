import mongoose from "mongoose";

export const PostcastSchema = new mongoose.Schema({
        name: { type: String, required: true },
        postcast: { type: String, required: true },
        desc: { type: String },
        category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
        comment: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
        backgroundSound: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "BackgroundSound",
        },
});

export default mongoose.model.Postcast ||
        mongoose.model("Postcast", PostcastSchema);
