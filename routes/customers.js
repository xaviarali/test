var express = require('express');
var router = express.Router();
fs = require('fs');
var oneir = require('../services/oneir');


/* GET customer listing. */
router.get('/', function(req, res, next) {
    oneir.parse('./data/arcusts.rnd', './data/formats/arcusts.format.txt', function(err, data){
    res.render('customers', { title: 'Express', data:data });
  });
});

router.post('/', function(req, res, next) {
});

router.get('/:uid', function(req, res, next) {
  var userid = req.params.uid;
});

module.exports = router;
