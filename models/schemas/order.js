const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    itemName: String,
    itemId: String, 
    quantity: Number, 
    unitPrice: Number, 
    totalPrice: Number, 
    customerId: String, 
    isPaid: Boolean, 
    isDelivered: Boolean, 
    businessId: { type: Schema.ObjectId, ref: 'User' }
  },
  {
    toObject: { getters: true },
    timestamps: {
      createdAt: 'createdDate',
      updatedAt: 'updatedDate'
    },
  }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;