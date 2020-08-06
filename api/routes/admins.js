const express = require('express')
const AdminController = require('../controllers/admin')

const router = express.Router()

router.get('/', AdminController.admins_all)

router.get('/:admin_id', AdminController.admin_by_id)

router.post('/', AdminController.create_admin)

router.delete('/:admin_id', AdminController.delete_admin)

router.patch('/:admin_id', AdminController.update_admin_by_id)

router.use(AdminController.error_handler)

module.exports = router