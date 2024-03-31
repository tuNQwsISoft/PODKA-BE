import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
        full_name: { typeL: String, required: true },
email: {type: String, required: true, unique: true},
password: {type: String, required: true}
);
}{timestamp: true});


export default mongoose.model.Users || mongoose.model("Users", UserSchema)
