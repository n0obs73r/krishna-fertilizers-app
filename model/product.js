const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    id: {type: Number},
    p_name: {type: String },
    p_brand: {type: String },
    type: {type: String },
    price: {type: Number },
    description: {type: String },
    img_url: {type: String },
    sale: {type: String },
    s_price: {type: Number },
    season: {type: String }
});

module.exports = mongoose.model('Product', productSchema);