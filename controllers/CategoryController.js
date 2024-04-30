import CategoryModel from "../models/CategoryModel.js";
import connection from "../connection/connect-mongodb.js";

export async function getAllCategory(req, res) {
  const category = await CategoryModel.find({});
  res.json(category);
}

export async function createCategory(req, res) {
  try {
    const { category } = req.body;
    await connection();
    const newCategory = new CategoryModel({
      category,
    });
    await newCategory.save();
    return res.status(200).send("Category created");
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}
