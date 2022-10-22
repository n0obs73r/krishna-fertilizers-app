const app = require("./app");
const debug = require("debug")("node-angular");
const http = require("http");

const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);






























//////////////////////////////////////////////////////////////////////////////////////
// var express = require('express');
// var path = require("path");
// var bodyParser = require('body-parser');
// var mongo = require("mongoose");
// const http = require('http');
// const { default: mongoose } = require('mongoose');

// // mongodb://localhost:27017/kfshop

// var db = mongo.connect("mongodb://localhost:27017/kfshop", function(err, response){
//     if(err){console.log( err); }
//     else{
//         // console.log('Connected to ' + db, '+', response);
//         console.log(response.name);
//         // console.log(db.product.find({"type":"seed"}));
//     }
// });

// var app = express();
// // app.use(bodyParser);
// // app.use(bodyParser.json({limit:'5mb'}));
// // app.use(bodyParser.urlencoded({extended: true}));
// app.listen(3000, () => console.log("Server running on port 3000!"))


// let MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/kfshop";


// app.use(function (req, res, next){
//     res.setHeader('Access-Control-Allow-Origin', 'https://localhost:4200');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
// });

// // var Schema = mongo.Schema;

// // var schema = new Schema({
// //     id: {type: Number},
// //     type: {type: String },
// //     name: {type: String },
// //     p_name: {type: String },
// //     b_name: {type: String },
// //     price: {type: String },
// //     description: {type: String },
// //     img_url: {type: String },
// //     sale: {type: Boolean },
// //     s_price: {type: Number },
// // }, { versionKey: false});

// // // var model = mongo.model('products', ProductSchema, 'products');
// // const ProductSchema = mongoose.model('product', schema);
// // module.exports = ProductSchema;
// // app.post("/api/GetData", function(res){
// //     res.send("done request!");
// // });


// app.get('/:name', (req, res) => {
//     MongoClient.connect(url, function(err, db) {
//         if (err) throw err;
//         var dbo = db.db("products");
//         dbo.collection("product").findOne({
//             type: req.params.name
//         },
//         function(err, result) {
//             if (err) throw err;
//             res.json(result);
//             db.close();
//         });
//     });
// });


// // const server = http.createServer((req, res) => {
// //     res.end("this is my first response");
// // });

// // server.listen(process.env.PORT || 3000);
