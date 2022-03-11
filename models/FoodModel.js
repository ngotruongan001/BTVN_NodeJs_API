const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        price: {
            type: Number,
            required: true,
        },
        amount: {
            type: Number,
            default: 1,
        },
        status: {
            type: Boolean,
            default: true,
        },
        image: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Food', FoodSchema);
