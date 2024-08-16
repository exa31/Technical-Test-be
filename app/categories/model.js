const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const categorySchema = new Schema({
    name: {
        type: String,
        minlength: 3,
        required: true
    },
    code_ct: {
        type: Number,
        unique: true,
    }
}, { timestamps: true });

categorySchema.plugin(AutoIncrement, { inc_field: 'code_ct', start_seq: 3 });

//to reset counter
// model("Category", categorySchema).counterReset('code_ct', function (err) {
//     // Now the counter is 0
// });

module.exports = model('Category', categorySchema);