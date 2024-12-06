const categoryService = require('../service/category.service');

const findAllCategories = async (req, res) => {
  const categories = await categoryService.findAllCategories();

  return res.status(200).json(categories);
};

const findCategoryById = async (req, res) => {
  const { id } = req.params;
  const category = await categoryService.findCategoryById(id);

  if (category.error) {
    return res.status(404).json({ error: category.error });
  }

  return res.status(200).json(category);
};

const createCategory = async (req, res) => {
  const category = req.body;
  const newCategory = await categoryService.createCategory(category);

  return res.status(201).json(newCategory);
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const category = req.body;
  const updatedCategory = await categoryService.updateCategory(id, category);

  if (updatedCategory.error) {
    return res.status(404).json({ error: updatedCategory.error });
  }

  return res.status(200).json({ message: updatedCategory });
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  const removeCategory = await categoryService.deleteCategory(id);

  if (removeCategory.error) {
    return res.status(404).json({ error: removeCategory.error });
  }

  return res.status(204).end();
};

module.exports = {
  findAllCategories,
  findCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
