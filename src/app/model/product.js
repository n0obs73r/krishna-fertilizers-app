const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    id: {type: Number},
    type: {type: String },
    name: {type: String },
    p_name: {type: String },
    b_name: {type: String },
    price: {type: String },
    description: {type: String },
    img_url: {type: String },
    sale: {type: Boolean },
    s_price: {type: Number },
});

module.exports = mongoose.model('Product', productSchema);