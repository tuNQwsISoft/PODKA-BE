import categoryModel from "../models/CategoryModel.js";

export async function getAllCategory(res) {
  const category = await categoryModel.find({});
  res.json(category);
}

export async function createCategory(req, res) {
  try {
    const { category } = req.body;
    const newCategory = new categoryModel({
      category,
    });
    await newCategory.save();
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}
