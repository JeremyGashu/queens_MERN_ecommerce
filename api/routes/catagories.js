const express = require('express')
const router = express.Router()
const CategoryController = require('../controllers/category')
const AdminAuthCecker = require('../middlewares/admin_auth')


router.get('/', CategoryController.categories_all)

router.get('/:category_id', CategoryController.category_by_id)

router.post('/',AdminAuthCecker.adminAuthChecker, CategoryController.create_category)

router.delete('/:category_id',AdminAuthCecker.adminAuthChecker, CategoryController.delete_category)

router.patch('/:category_id',AdminAuthCecker.adminAuthChecker, CategoryController.update_category)

 router.use(CategoryController.error_handler)

module.exports = router