const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = model('Order', orderSchema); 