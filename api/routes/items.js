const express = require('express')
const ItemsController = require('../controllers/items')
const AdminAuthCecker = require('../middlewares/admin_auth')

const multer = require('multer')

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, './assets/images/uploads')
    },
    filename : (req, file, cb) => {
        cb(null, new Date().toISOString() + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true)
    }
    else {
        cb(null, false)
    }
}

const upload = multer({
    storage,limits : {
    fileSize : 1024 * 1024 * 6
    },
    fileFilter

})

const router = express.Router()

router.get('/', ItemsController.get_all_items)

router.get('/discounted', ItemsController.discounted_items)

router.get('/search', ItemsController.search_item_by_name)

router.get('/new', ItemsController.newly_added_items)
 
router.get('/:item_id', ItemsController.items_by_id)

router.post('/',upload.single('itemImage'), AdminAuthCecker.adminAuthChecker,ItemsController.create_item)

router.post('/add_review/:item_id', ItemsController.add_review_on_item)

router.delete('/:item_id', AdminAuthCecker.adminAuthChecker, ItemsController.delete_item)

router.patch('/:item_id', AdminAuthCecker.adminAuthChecker, ItemsController.update_item)

router.patch('/add_discount/:item_id', AdminAuthCecker.adminAuthChecker, ItemsController.add_discount_on_item)

router.patch('/remove_discount/:item_id', AdminAuthCecker.adminAuthChecker, ItemsController.remove_discount_from_item)

router.use(ItemsController.error_handler)

module.exports = router