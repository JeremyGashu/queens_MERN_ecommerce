const express = require('express')
const DiscountController = require('../controllers/discount')
const AdminAuthCecker = require('../middlewares/admin_auth')

const router = express.Router()

router.get('/',DiscountController.discounts_all)

router.get('/:discount_id', DiscountController.discount_by_id)

router.post('/', AdminAuthCecker.adminAuthChecker, DiscountController.create_discount)

router.delete('/:discount_id', AdminAuthCecker.adminAuthChecker, DiscountController.delete_discount)

router.patch('/:discount_id', AdminAuthCecker.adminAuthChecker, DiscountController.update_discount)

router.use(DiscountController.error_handler)

module.exports = router