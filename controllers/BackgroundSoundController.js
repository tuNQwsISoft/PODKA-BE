import { BackgroundSound } from "../models/BackgroundSoundModel.js";
import connection from "../connection/connect-mongodb.js";

export async function getAllPublicBackgroundSounds(req, res) {
  try {
    const backgroundSounds = await BackgroundSound.find({ public: true });

    res.status(200).json({ message: "success", data: { backgroundSounds } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getPublicBackgroundSoundById(req, res) {
  const id = req.params.id;
  try {
    const backgroundSound = await BackgroundSound.findById(id);

    if (backgroundSound && backgroundSound.public) {
      res.status(200).json({ message: "success", data: { backgroundSound } });
    } else {
      res.status(404).json({ message: "Background sound not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getAllPublicBackgroundSoundByUser(req, res) {
  const userId = req.params.userId;
  try {
    const backgroundSounds = await BackgroundSound.find({
      user: userId,
      public: true,
    }).populate("user");

    res.status(200).json({ message: "success", data: { backgroundSounds } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getPublicBackgroundSoundByUserById(req, res) {
  const userId = req.params.userId;
  const id = req.params.id;
  try {
    const backgroundSound = await BackgroundSound.findOne({
      user: userId,
      _id: id,
      public: true,
    }).populate("user");

    if (backgroundSound) {
      res.status(200).json({ message: "success", data: { backgroundSound } });
    } else {
      res.status(404).json({ message: "Background sound not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createBackgroundSound(req, res) {
  const { user, audioUrl, isPublic, name } = req.body;

  try {
    await connection();
    const newBackgroundSound = new BackgroundSound({
      user,
      url: audioUrl,
      public: isPublic,
      name: name,
    });
    await newBackgroundSound.save();
    res.status(200).json(newBackgroundSound);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
