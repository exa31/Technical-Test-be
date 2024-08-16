const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        max: [50, 'Name is too long'],
        min: [3, 'Name is too short']
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        min: [8, 'Password is too short']
    },
    address: {
        kelurahan: {
            type: String,
            required: true
        },
        kecamatan: {
            type: String,
            required: true
        },
        kota: {
            type: String,
            required: true
        },
        provinsi: {
            type: String,
            required: true
        },
        detail: {
            type: String,
            required: true
        }
    },
    token: [],
    phone_number: {
        type: String,
        required: true,
        minlength: [10, 'Phone number is too short']
    },
}, { timestamps: true }
);

module.exports = model('User', userSchema);