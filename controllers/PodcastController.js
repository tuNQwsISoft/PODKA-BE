import PodcastModel from "../models/PodcastModel.js";

export async function getAllPodcasts(req, res) {
  const podcasts = await PodcastModel.find({});
  res.status(200).json(podcasts);
}

export async function getPodcastById(req, res) {
  const id = req.params.id;
  try {
    const podcast = await PodcastModel.findById(id).populate(
      "user",
      "full_name",
    );
    if (podcast) {
      return res.status(200).json(podcast);
    } else {
      return res.status(404).json({ error: "Podcast not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function createPodcast(req, res) {
  try {
    const {
      name,
      podcast,
      desc,
      user,
      like,
      category,
      backgroundSound,
      backgroundImage,
    } = req.body;
    const newPodcast = new PodcastModel({
      name,
      podcast,
      desc,
      like,
      user,
      category,
      backgroundSound,
      backgroundImage,
    });
    await newPodcast.save();
    res.status(200).json(newPodcast);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

export async function editPodcast(req, res) {
  const id = req.params.id;
}
