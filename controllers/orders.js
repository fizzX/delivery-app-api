const Order = require('../models/schemas/order')

/*
* CRUD Controllers
*/

exports.createOrder = (req, res, next) => {
  	if (!req.body.itemId) {
    	return res.status(400).send('Must provide item ID')
  	}
  	if (!req.body.customerId) {
    	return res.status(400).send('Must provide customer ID')
  	}
  	if (!req.body.quantity) {
    	return res.status(400).send('Must provide quantity')
  	}

  	const orderData = {
    	itemName: req.body.itemName,
    	itemId: req.body.itemId,
    	quantity: req.body.quantity,
    	unitPrice: req.body.unitPrice,
    	totalPrice: req.body.totalPrice,
    	customerId: req.body.customerId
    	isPaid: req.body.isPaid,
    	isDelivered: false,
  	}
  	const newOrder = new Order(orderData)
  	newOrder.save((err) => {
    	if (err) return next(err)
    	return res.json(newOrder)
  	})
}

// get all orders in db
exports.getAllOrders = (req, res, next) => {
  	Order.find({}, (err, orders) => {
	    if (err) return next(err)
	    return res.json(orders)
	})
}

// get all orders not paid
exports.getOrdersNotPaid = (req, res, next) => {
	Order.find({ isPaid: false }, (err, orders) => {
		if (err) return next(err)
		return res.json(orders)
	})
}

// get all orders not delivered
exports.getOrdersNotDelivered = (req, res, next) => {
	Order.find({ isDelivered: false }, (err, orders) => {
		if (err) return next(err)
		return res.json(orders)
	})
}

exports.getOrderById = (req, res, next) => {
	Order.findById(req.params.orderId, (err, order) => {
		if (err) return next(err)
		if (!order) return res.status(404).send('No order with id: ' + req.params.orderId)
	    return res.json(order)
	})
}

exports.updateOrder = (req, res, next) => {
	Order.findOneAndUpdate({ _id: req.params.orderId }, req.body, {}, (err, order) => {
		if (err) return next(err)
		if (!order) return res.status(404).send('No order with id: ' + req.params.orderId)
	    return res.json(order)
	})
}

exports.deleteOrder = (req, res, next) => {
	Order.findByIdAndRemove(req.params.orderId, (err, order) => {
		if (err) return next(err)
		if (!order) return res.status(404).send('No order with id: ' + req.params.orderId)
	    return res.json(order)
	})
}