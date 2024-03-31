import mongoose from "mongoose";

export const BackgroundSoundSchema = new mongoose.Schema({
        name: { type: String },
});

export default mongoose.model.BackgroundSound ||
        mongoose.model("BackgroundSound", BackgroundSoundSchema);
