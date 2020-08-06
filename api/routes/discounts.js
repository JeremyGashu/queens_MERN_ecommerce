/*

ALL DISCOUNT ROUTES
================
/ - all discounts
/:id - category with some id
/new - discounts added at least before 3 days

*/

const express = require('express')
const DiscountController = require('../controllers/discount')

const router = express.Router()

router.get('/',DiscountController.discounts_all)

router.get('/:discount_id', DiscountController.discount_by_id)

router.post('/', DiscountController.create_discount)

router.delete('/:discount_id', DiscountController.delete_discount)

router.patch('/:discount_id', DiscountController.update_discount)

router.use(DiscountController.error_handler)

module.exports = router