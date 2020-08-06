const express = require('express')
const router = express.Router()
const CategoryController = require('../controllers/category')

router.get('/', CategoryController.categories_all)

router.get('/:category_id' ,CategoryController.category_by_id)

router.post('/', CategoryController.create_category)

router.delete('/:category_id', CategoryController.delete_category)

router.patch('/:category_id', CategoryController.update_category)

 router.use(CategoryController.error_handler)

module.exports = router