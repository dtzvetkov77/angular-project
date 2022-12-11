const mongoose = require('mongoose');
const foodSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    tags: {
        type: [String]
    },
    favorite: {
        type: Boolean,
        default: false
    },
    imageUrl: {
        type: String,
        required: true
    },
    origins: {
        type: [String],
        required: true
    },
    cookTime: {
        type: String,
        required: true
    }
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    },
    timestamps: true
})




const Food = mongoose.model('Food', foodSchema);

module.exports = Food;