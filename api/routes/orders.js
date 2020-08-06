const express = require('express')
const OrderController = require('../controllers/order')

const router = express.Router()

router.get('/', OrderController.orders_all)

router.get('/unchecked', OrderController.unchecked_orders)

router.get('/:order_id', OrderController.order_by_id)

router.post('/', OrderController.create_order)

router.delete('/:order_id', OrderController.delete_order)

router.patch('/:order_id', OrderController.mark_as_delivered)

router.use(OrderController.error_handler)

module.exports = router