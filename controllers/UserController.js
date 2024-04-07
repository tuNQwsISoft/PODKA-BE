import bcrypt from "bcrypt";
import UserModel from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import connection from "../connection/connect-mongodb.js";

export async function register(req, res) {
  try {
    const { full_name, email, password } = req.body;
    await connection();

    const emailAlreadyExists = await UserModel.findOne({ email });
    if (emailAlreadyExists) {
      return res.status(400).send("Email already exists");
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new UserModel({
      full_name,
      email,
      hashedPassword,
    });
    await newUser.save();
    return res.status(200).send("User has been created");
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    await connection();
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).send("User does not exist");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (passwordCompare) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h", // Token expires in 1 hour
      });

      // Return the token to the client
      return res
        .status(200)
        .json({ message: "Login successful", username: user.email, token });
    } else {
      return res.status(401).send("Invalid password");
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
}
