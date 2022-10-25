const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require('path');
const sharp = require('sharp');
const User = require("./model/user");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const checkAuth = require("./middleware/check-auth")

// const Product = require('./model/product');
const Product = require('./model/product');
const { memoryStorage } = require('multer');
//VfuApYwUqUpTrnbx
const app = express();
const router = express.Router();

const storage = memoryStorage();

mongoose.connect("mongodb+srv://aryand:VfuApYwUqUpTrnbx@cluster0.psmskrd.mongodb.net/?retryWrites=true&w=majority")
.then(() => {
    console.log('Connected to Database!');
})
.catch(() =>
console.log("Connection Failed!"));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false}));
app.use("/uploads", express.static(path.join("uploads")));

app.use(function (req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.post('/product-form', checkAuth, multer({storage: storage}).single("image"), async (req,res,next) =>{
    const url = req.protocol + '://' + req.get("host");
    const filename= req.body.p_name + req.body.p_brand + Date.now() + req.file.originalname;
    await sharp(req.file.buffer).resize({width: 400, height: 400, fit: sharp.fit.contain}).toFile('./uploads/'+ filename )
    const product = new Product({
        id: 32131231,
        p_name : req.body.p_name,
        p_brand : req.body.p_brand,
        type : req.body.type ,
        price : req.body.price ,
        description : req.body.description ,
        img_url : url + "/uploads/"+ filename,
        sale : req.body.sale,
        s_price : req.body.s_price,
        season : req.body.season
    });
    // console.log(req.body.p_brand);
    console.log(product);
    console.log(req.file);
    product.save();
    res.status(201).json({
        message: "Post Added successfully"
    });
});

// app.get("/product-form/edit/:id", checkAuth , (req, res, next) => {
app.get("/edit/:id", checkAuth , (req, res, next) => {
  Product.findById(req.params.id).then(product => {
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found!" });
    }
  });
});

// app.put("/product-form/edit/:id", multer({ storage: storage }).single("image"), async (req, res, next) => {
app.put("/edit/:id", checkAuth, multer({ storage: storage }).single("image"), async (req, res, next) => {
    const url = req.protocol + '://' + req.get("host");
    // console.log("file is requested:" + req.file);
    // console.log("product iD2:" + req.body.id);
    let filename = req.body.p_name + req.body.p_brand + Date.now() + req.body.img_url;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      const filename = req.body.p_name + req.body.p_brand + Date.now() + req.file.originalname;
      await sharp(req.file.buffer).resize({width: 400, height: 400, fit: sharp.fit.contain}).toFile('./uploads/'+ filename )
    }
    const product = new Product({
      id: 20,
      _id: req.body.id,
      p_name : req.body.p_name,
      p_brand : req.body.p_brand,
      type : req.body.type ,
      price : req.body.price ,
      description : req.body.description ,
      img_url : url + "/uploads/"+ filename,
      sale : req.body.sale,
      s_price : req.body.s_price,
      season : req.body.season
    });
    console.log("product iD2:" + req.body.id);
    Product.updateOne(
      { _id: req.params.id},
      product
    ).then(result => {
      res.status(200).json({ message: "Update Successful"});
      // if (result.nModified > 0) {
      //   res.status(200).json({ message: "Update successful!" });
      // } else {
      //   console.log(product);
      //   res.status(401).json({ message: "Not authorized!" });
      // }
    });
  }
);

app.get('/product-management', checkAuth, (req,res,next) =>{
  const pageSizeProduct = +req.query.pagesize;
  console.log(req.query);
  const currentPageProduct = +req.query.page;
  const productQueryProduct = Product.find();
  let fetchedProducts;
  if(pageSizeProduct && currentPageProduct){
    productQueryProduct
      .skip(pageSizeProduct * (currentPageProduct - 1))
      .limit(pageSizeProduct);
  }
  productQueryProduct.then(documents => {
    fetchedProducts = documents;
    return Product.count();
  })
    .then(countProduct => {
      res.status(200).json({
        message: "Products Fetched Successfully!",
        products: fetchedProducts,
        maxProducts: countProduct
      });
    });
});

app.get('/seeds-view',(req,res,next) =>{
  const pageSizeSeed = +req.query.pagesize;
  console.log(req.query);
  const currentPageSeed = +req.query.page;
  const productQuerySeed = Product.find({type:"seed"});
  // const productQuerySeedCount = Product.count({type:"seed"});
  // console.log(productQuerySeedCount);
  let fetchedSeeds;
  if(pageSizeSeed && currentPageSeed){
    productQuerySeed
      .skip(pageSizeSeed * (currentPageSeed - 1))
      .limit(pageSizeSeed);
  }
  productQuerySeed.then(documents => {
      fetchedSeeds = documents;
      return Product.count({type:"seed"});
    })
    .then(countSeed => {
      res.status(200).json({
        message: "Products Fetched Successfully!",
        products: fetchedSeeds,
        maxProductsSeeds: countSeed
      });
    });
  // console.log(countSeed);
});

app.get('/fertilizers-view',(req,res,next) =>{
  const pageSizeFertilizer = +req.query.pagesize;
  const currentPageFertilizer = +req.query.page;
  const productQueryFertilizer = Product.find({type:"fertilizers"});
  let fetchedFertilizers;
  if(pageSizeFertilizer && currentPageFertilizer){
    productQueryFertilizer
      .skip(pageSizeFertilizer * (currentPageFertilizer - 1))
      .limit(pageSizeFertilizer);
  }
  productQueryFertilizer.then(documents => {
    fetchedFertilizers = documents;
    return Product.count({type:"fertilizers"});
  })
    .then(countFertilizer => {
    res.status(200).json({
      message: "Products Fetched Successfully!",
      products: fetchedFertilizers,
      maxProductsFertilizers: countFertilizer
    });
  });


});
app.get('/machinery-view',(req,res,next) =>{
  const pageSizeMachine = +req.query.pagesize;
  const currentPageMachine = +req.query.page;
  const productQueryMachine = Product.find({type:"machine"});
  let fetchedMachine;
  if(pageSizeMachine && currentPageMachine){
    productQueryMachine
      .skip(pageSizeMachine * (currentPageMachine - 1))
      .limit(pageSizeMachine);
  }
  productQueryMachine.then(documents => {
    fetchedMachine = documents;
    return Product.count({type:"machine"});
  })
    .then(countMachine => {
    res.status(200).json({
      message: "Products Fetched Successfully!",
      products: fetchedMachine,
      maxProductsMachine: countMachine
    });
  });


});

app.post('/signup',(req,res,next) =>{
  bcrypt.hash(req.body.password, 10)
    .then( hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then( result => {
          res.status(201).json({
            message: 'User Created',
            result: result
          });
        })
        .catch( err => {
          res.status(500).json({
            error: err
          });
        })
    });
});

app.post('/login',(req,res,next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      // console.log(user);
      if (!user) {
        return res.status(401).json({
          message: "Auth Failed"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then( result => {
      // console.log(result);
      if (!result){
        return res.status(401).json({
          message: "Auth Failed"
        });
      }
      const token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser._id},
        'aryandadheech',
        {expiresIn: "100h"} );
      res.status(200).json({
        token: token
      });
    })
    .catch(err => { return res.status(401).json({
      message: "Auth Failed"
    })
    })

});

module.exports = app;
