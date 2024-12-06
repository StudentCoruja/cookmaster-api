const categoryModel = require('../model/category.model');

const findAllCategories = async () => {
  const categories = await categoryModel.findAll();

  return categories;
};

const findCategoryById = async (id) => {
  const category = await categoryModel.findById(id);

  if (!category) return { error: `Category with id ${id} not found` };

  return category;
};

const createCategory = async (category) => {
  const newCategory = await categoryModel.create(category);

  return newCategory;
};

const updateCategory = async (id, category) => {
  const updatedCategory = await categoryModel.update(id, category);

  if (updatedCategory === 0) return { error: `Category with id ${id} not found` };

  return { message: 'Category updated successfully' };
};

const deleteCategory = async (id) => {
  const removeCategory = await categoryModel.remove(id);

  if (removeCategory === 0) return { error: `Category with id ${id} not found` };

  return { message: 'Category deleted successfully' };
};

module.exports = {
  findAllCategories,
  findCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
