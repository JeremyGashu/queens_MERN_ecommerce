const express = require('express')
const AdminController = require('../controllers/admin')
const SuperAdminAuthCheker = require('../middlewares/super_admin_auth')

const router = express.Router()

router.get('/', SuperAdminAuthCheker.superAdminAuthChecker, AdminController.admins_all)

router.get('/logout', AdminController.logout_admin)

router.get('/:admin_id',SuperAdminAuthCheker.superAdminAuthChecker,   AdminController.admin_by_id)

router.post('/register',SuperAdminAuthCheker.superAdminAuthChecker, AdminController.create_admin)

router.post('/login', AdminController.login_admin)

router.delete('/:admin_id', SuperAdminAuthCheker.superAdminAuthChecker, AdminController.delete_admin)

router.patch('/:admin_id', SuperAdminAuthCheker.superAdminAuthChecker, AdminController.update_admin_by_id)

router.use(AdminController.error_handler)

module.exports = router