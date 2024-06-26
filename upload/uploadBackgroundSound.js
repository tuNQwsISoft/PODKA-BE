import express from "express";
import multer from "multer";
import cloudinary from "../utils/config.Cloudinary.js";

const uploadBackgroundSound = express.Router();

const storage = multer.diskStorage({});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("audio")) {
      cb(null, true);
    } else {
      cb(new Error("Only audio files are allowed"));
    }
  },
}).single("audioFile");

uploadBackgroundSound.post("/background_sounds", upload, (req, res) => {
  // Changed route path to "/"
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  cloudinary.uploader.upload(
    req.file.path,
    { folder: "podka/background_sounds", resource_type: "video" },
    (error, result) => {
      if (error) {
        console.error("Upload to Cloudinary failed:", error);

        return res.status(500).json({ error: "Upload failed" });
      }
      res.json({ audioUrl: result.secure_url });
    }
  );
});

export default uploadBackgroundSound;
