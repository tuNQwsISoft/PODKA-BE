import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connection from "./connection/connect-mongodb.js";
import router from "./routes/routes.js";
const app = express();
app.use(express.json());

dotenv.config();
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by");

const PORT = process.env.PORT;
connection().then(() => {
        console.log("Connected to MongoDB!");

        app.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}...`);
        });
});

/** HTTP GET Request */
app.get("/", (res) => {
        res.status(201).json("Home GET Request");
});

app.use("/api", router);
