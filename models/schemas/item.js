const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: String,
    description: String,
    price: Number, 
    url: String,
    tags: [String],
    quantity: Number, 
    views: Number,
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

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;