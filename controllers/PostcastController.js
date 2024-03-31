import postcastModel from "../models/PostcastModel.js";

export async function getPostcasts(req, res) {
        const postcasts = await postcastModel.find({});
        res.json(postcasts);
}

export async function getPostcast(req, res) {
        const { id } = req.params;
        if (id) {
                res.status(200).json(id);
        } else {
                res.status(404);
        }
}

export async function createPostcast(req, res) {
        try {
                const { name, postcast, desc, category, backgroundSound } =
                        req.body;
                const newPostcast = new postcastModel({
                        name,
                        postcast,
                        desc,
                        category,
                        backgroundSound,
                });
                await newPostcast.save();
                return res.status(200).send("Create sucesss");
        } catch (error) {
                return res.status(500).send({ error: error.message });
        }
}

export default { getPostcasts, getPostcast, createPostcast };
