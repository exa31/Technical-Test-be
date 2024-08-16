const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: [2, 'Product name too short'],
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    code_pd: {
        type: Number,
        unique: true
    },
}, { timestamps: true });


productSchema.plugin(AutoIncrement, { inc_field: 'code_pd', start_seq: 13 });

//to reset counter
// model("Product", productSchema).counterReset('code_pd', function (err) {
//     // Now the counter is 0
// });

module.exports = model('Product', productSchema);