const express = require('express')
const OrderController = require('../controllers/order')
const AdminAuthCecker = require('../middlewares/admin_auth')


const router = express.Router()

router.get('/', OrderController.orders_all)

router.get('/unchecked', OrderController.unchecked_orders)

router.get('/:order_id', OrderController.order_by_id)

router.post('/', AdminAuthCecker.adminAuthChecker, OrderController.create_order)

router.delete('/:order_id', AdminAuthCecker.adminAuthChecker, OrderController.delete_order)

router.patch('/:order_id', AdminAuthCecker.adminAuthChecker, OrderController.mark_as_delivered)

router.use(OrderController.error_handler)

module.exports = router