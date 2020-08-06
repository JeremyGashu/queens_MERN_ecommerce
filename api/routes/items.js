/*

ALL ITEM ROUTES
================
/ or ?category_id - all items in the database with or without some category
/:id - an item with specific id
/discounted - items which are on discount 
/new - newly added items i.e since 3 days ago *************
/featured - materials that are choosy by the users ******* will be added after order is added
/search?q=searchParam - search items based on their name *****

*/

const express = require('express')
const ItemsController = require('../controllers/items')

const router = express.Router()

router.get('/', ItemsController.get_all_items)

router.get('/discounted', ItemsController.discounted_items)

router.get('/search', ItemsController.search_item_by_name)

router.get('/new', ItemsController.newly_added_items)
 
router.get('/:item_id', ItemsController.items_by_id)

router.post('/', ItemsController.create_item)

router.delete('/:item_id', ItemsController.delete_item)

router.patch('/:item_id', ItemsController.update_item)

router.patch('/add_discount/:item_id', ItemsController.add_discount_on_item)

router.patch('/remove_discount/:item_id', ItemsController.remove_discount_from_item)



router.use(ItemsController.error_handler)

module.exports = router