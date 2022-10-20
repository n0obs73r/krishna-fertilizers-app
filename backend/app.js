const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");

const Product = require('../model/product')
//VfuApYwUqUpTrnbx
const app = express();

const MIME_TYPE_MAP = {
    'image/png' : 'png',
    'image/jpeg' : 'jpg',
    'image/jpeg' : 'jpg',
};

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads')
    },
    filename: (req, file, callBack) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        console.log(ext);
        callBack (null, name +  "-" + Date.now() + '.' + ext);
    }
  })
mongoose.connect("mongodb+srv://aryand:VfuApYwUqUpTrnbx@cluster0.psmskrd.mongodb.net/test?retryWrites=true&w=majority")
.then(() => {
    console.log('Connected to Database!');
})
.catch(() => 
console.log("Connection Failed!"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.post('/product-form', multer({storage: storage}).single("image"),(req,res,next) =>{
    const url = req.protocol + '://' + req.get("host");
    const product = new Product({
        id: 32131231,
        p_name : req.body.p_name,
        p_brand : req.body.p_brand,
        type : req.body.type ,
        price : req.body.price ,
        description : req.body.description ,
        img_url : url + "/uploads/"+ req.file.filename,
        sale : req.body.sale,
        s_price : req.body.s_price,
        season : req.body.season 
    });
    console.log(product);
    product.save();
    res.status(201).json({
        message: "Post Added successfully"
    });
});

app.get('/product-form',(req,res,next) =>{
    // const posts = [
    //     {
    //     id: 1,
    //     type: "seed",
    //     p_brand: "syngenta",
    //     p_name: "radish",
    //     price: 501,
    //     description: "description",
    //     season: "winter",
    //     img_url: "https://dummyurl",
    //     sale: true,
    //     sale_price: 451
    //     },
    //     {
    //     id: 3,
    //     type: "seed",
    //     p_brand: "syngenta",
    //     p_name: "tomato",
    //     price: 502,
    //     description: "description",
    //     season: "winter",
    //     img_url: "https://dummyurl",
    //     sale: true,
    //     sale_price: 452
    // }
    // ];
    // res.status(200 ).json({
    //     message: 'Posts fetched successfully!',
    //     posts: posts
    // });
});

module.exports = app;