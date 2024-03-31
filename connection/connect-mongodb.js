import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connection = async () => {
        const mongoURL = process.env.DATABASE_URL;

        if (!mongoURL) {
                throw new Error("MONGO environment variable is not defined!");
        }
        try {
                await mongoose.connect(mongoURL);
        } catch (error) {
                console.error("Connection failed!", error);
        }
};

export default connection;
