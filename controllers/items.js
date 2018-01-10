const Item = require('../models/schemas/item')

/*
* CRUD Controllers
*/

exports.createItem = (req, res, next) => {
  	if (!req.body.name) {
    	return res.status(400).send('Must provide name')
  	}
  	if (!req.body.price) {
    	return res.status(400).send('Must provide valid price')
  	}
  	if (!req.body.quantity) {
    	return res.status(400).send('Must provide quantity')
  	}

  	const itemData = {
    	name: req.body.name,
    	description: req.body.description,
    	price: req.body.price,
    	url: req.body.url, 
    	tags: req.body.tags,
    	quantity: req.body.quantity
  	}
  	const newItem = new Item(itemData)
  	newItem.save((err) => {
    	if (err) return next(err)
    	return res.json(newItem)
  	})
}

// get all items in db
exports.getAllItems = (req, res, next) => {
  	Item.find({}, (err, items) => {
	    if (err) return next(err)
	    return res.json(items)
	})
}

// get all items with at least 1 qty in stock
exports.getItems = (req, res, next) => {
	Item.find({ quantity: { $gt: 0 }}, (err, items) => {
		if (err) return next(err)
		return res.json(items)
	})
}

exports.getItemById = (req, res, next) => {
	Item.findById(req.params.itemId, (err, item) => {
		if (err) return next(err)
		if (!item) return res.status(404).send('No item with id: ' + req.params.itemId)
	    return res.json(item)
	})
}

exports.getItemByName = (req, res, next) => {
	Item.findOne({ name: req.params.name }, (err, item) => {
		if (err) return next(err)
		if (!item) return res.status(404).send('No item with name: ' + req.params.name)
	    return res.json(item)
	})
}

exports.updateItem = (req, res, next) => {
	Item.findOneAndUpdate({ _id: req.params.itemId }, req.body, {}, (err, item) => {
		if (err) return next(err)
		if (!item) return res.status(404).send('No item with id: ' + req.params.itemId)
	    return res.json(item)
	})
}

exports.deleteItem = (req, res, next) => {
	Item.findByIdAndRemove(req.params.itemId, (err, item) => {
		if (err) return next(err)
		if (!item) return res.status(404).send('No item with id: ' + req.params.itemId)
	    return res.json(item)
	})
}