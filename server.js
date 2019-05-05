const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const fs = require('fs');
const multer = require('multer');

const app = express();
const DIR = './uploads';

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
//  rename: function (fieldname, filename) {
  //  return file.filename +'-'+ Date.now() +'.'+ path.extname(file.originalname);
 // }
  //,
  filename: (req, file, cb) => {
    return cb(null, file.fieldname + '-' + Date.now() +  path.extname(file.originalname));
  }
});

let upload = multer({storage: storage});

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: true}));
// Parsers for POST data
app.use(bodyParser.json()); //  basically tells the system that you want json to be used.
app.use(bodyParser.urlencoded({ extended: true })); // basically tells the system whether 
// you want to use a simple algorithm for shallow parsing (i.e. false) or complex algorithm for deep 
// parsing that can deal with nested objects (i.e. true).


app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  
  next();
});


/*
 *  Image Upload Library
 */
app.get('/api/upload', function (req, res) {
  res.end('Custom Angular Image Upload Library');
});

app.post('/api/upload',upload.single('photo'), function (req, res) {
  if (!req.file) {
      alert("No file received! Please Try Again!");
      return res.send({
        success: false
      });
  } else { 
      return res.send({
        success: true,
        filePath: req.file.path,
      })
    }
});


/*
 * mongoose setup
 */
const mongoose = require('mongoose')
//switching mongoose from callbacks to Promises.
//promosis is the build in feature of node
mongoose.Promise = Promise
mongoose.connect('mongodb://localhost:27017/recipedb')
.then(() => console.log('Mongoose is running fine.'))

// Get our API routes
const api = require('./server/routes/api');

// copied body parser

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist/my-first-app')));

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/my-first-app/index.html'));
});
/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));