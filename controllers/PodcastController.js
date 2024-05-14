import PodcastModel from "../models/PodcastModel.js";

export async function getAllPodcasts(req, res) {
  try {
    const podcasts = await PodcastModel.find({})
      .populate("user", "full_name")
      .populate("backgroundSound")
      .populate("backgroundImage");

    const sections = [
      {
        name: "Most played",
        podcasts: podcasts.map((podcast) => ({
          id: podcast._id,
          title: podcast.name,
          creator: podcast.user.full_name,
          likes: podcast.like,
          backgroundImage: podcast.backgroundImage
            ? podcast.backgroundImage
            : null,
          backgroundSound: podcast.backgroundSound
            ? podcast.backgroundSound.backgroundSound
            : null,
        })),
      },
    ];

    res.status(200).json({ message: "success", data: { sections } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getPodcastById(req, res) {
  const id = req.params.id;
  try {
    const podcast = await PodcastModel.findById(id)
      .populate("user", "full_name")
      .populate("backgroundSound");

    if (podcast) {
      const guests = [podcast.user.full_name];
      if (podcast.guests && podcast.guests.length > 0) {
        guests.push(...podcast.guests.map((user) => user.full_name));
      }

      const responseData = {
        id: podcast._id,
        title: podcast.name,
        creator: podcast.user.full_name,
        guests: guests,
        podcast: podcast.podcast,
        likes: podcast.like,
        description: podcast.desc || null,
        category: podcast.category || null,
        backgroundSound: podcast.backgroundSound
          ? podcast.backgroundSound.url
          : null,
        backgroundImage: podcast.backgroundImage || null,
      };
      return res.status(200).json({ message: "success", data: responseData });
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
