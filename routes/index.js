const express = require('express')
const router = express.Router()

const users = require('../controllers/users')
const items = require('../controllers/items')

/*
* ---- Routes for users ----
*/

router.route('/users')
	.get(users.getAllUsers)
	.post(users.createUser)

router.route('/users/:userId/id')
	.get(users.getUserById)
	.delete(users.deleteUser)
	.put(users.updateUser)

router.route('/users/:email/email')
	.get(users.getUserByEmail)

// 
// ---- Routes for items ----
// 

router.route('/items')
	.get(items.getAllItems)
	.post(items.createItem)

router.route('/items/:itemId/id')
	.get(items.getItemById)
	.delete(items.deleteItem)
	.put(items.updateItem)

router.route('/items/:name/name')
	.get(items.getItemByName)

/*
* ---- Routes for orders ----
*/

router.route('/orders')
	.get(orders.getAllOrders)
	.post(orders.createOrder)

router.route('/orders/:orderId/id')
	.get(orders.getOrderById)
	.delete(orders.deleteOrder)
	.put(orders.updateOrder)	





module.exports = router