const express = require('express');

const categoryController = require('../controller/category.controller');
const validateCategory = require('../middlewares/validate.category');

const router = express.Router();

router.get('/', categoryController.findAllCategories);
router.get('/:id', categoryController.findCategoryById);
router.post('/', validateCategory, categoryController.createCategory);
router.put('/:id', validateCategory, categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
