var express = require('express');
var router = express.Router();
fs = require('fs');
var oneir = require('../services/oneir');
var pyex = require('../services/PythonExtension');

/* GET product listing. */
router.get('/', function(req, res, next) {
  oneir.parse('./data/inventho.rnd', './data/formats/invent.format.txt', function(err, data){
    console.log("In inventory.js")
    pyex.sumOfPrice(data, function(err, sum){
      console.log("In pyex callback")
      console.log(sum);
      res.render('products', { title: 'Express', data:data, total:sum });
    });
  });
});

router.get('/detail/:index', function(req, res, next) {
  console.log("In details")
  var index = req.params.index;
  oneir.parse('./data/inventho.rnd', './data/formats/invent.format.txt', function(err, data){
    var item = data[index-1];
    console.log(item)
    res.render('inventory_detail', { title: 'Express', index:req.params.index, item:item});
  });
});

router.post('/save/', function(req, res, next) {
  console.log("In saved")
  var price = parseFloat(req.body['price']);
  var index = req.body['index'];
  oneir.updateInventoryPrice(index, price, function(err, result){
    if(err == null){
    }
    res.redirect('/products');
  });
});


module.exports = router;
