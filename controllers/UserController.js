import bcrypt from "bcrypt";
import UserModel from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import connection from "../connection/connect-mongodb.js";
import { serialize } from "cookie";

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
        expiresIn: "1h",
      });
      res.setHeader(
        "Set-Cookie",
        serialize("token", token, {
          httpOnly: true,
          maxAge: 3600,
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
          path: "/",
        })
      );

      return res
        .status(200)
        .json({ message: "Login successful", username: user.email });
    } else {
      return res.status(401).send("Invalid password");
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
}

export async function logout(req, res) {
  res.setHeader(
    "Set-Cookie",
    serialize("token", "", {
      httpOnly: true,
      maxAge: -1,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    })
  );
  return res.status(200).send("Logged out");
}

export async function getUser(req, res) {
  try {
    await connection();
    const userId = req.cookies.userId;

    if (!userId) {
      return res.status(400).send("User ID not found in cookies");
    }

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    return res.status(200).json({ message: "success", data: { user } });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}
