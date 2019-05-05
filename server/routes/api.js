const express = require('express');
const router = express.Router();

// MongoDB
const Recepie = require('../../schema/recipes')

//upload
// declare axios for making http requests
//const axios = require('axios');
const API = 'https://jsonplaceholder.typicode.com';
  

 
/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

// Get all posts
router.get('/recepies', function(req, res, next) {
  Recepie.find(function (err, products) {
    if (err) return console.log(err);
    res.json(products);
  });

});

//Addd Recepie
router.post('/addRecepie', (req, res, next) => {
  Recepie.create(req.body, function(err, post){
    if(err) return next(err);
    res.json(post); 
  });
});

//Get single recipe
router.get('/recepie/:id', function(req, res){
  Recepie.findById(req.params.id, function (err, post){
    if(err) res.status(500).send(error)
    res.json(post);
  });
});

//Update Recepieni
router.put('/updateRecepie/:id', function(req, res){
  Recepie.findByIdAndUpdate(req.params.id, req.body, function(err, post){
    if(err) return console.log(err);
    res.json(post); 
  });
});

//Delete Recepie
router.delete('/deleteRecepie/:id', function(req, res){
  Recepie.findByIdAndRemove(req.params.id, req.body, function(err, post){
    if(err) return console.log(err);
    res.json(post);
  });
});

module.exports = router;