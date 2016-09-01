var express = require('express');
var router = express.Router();

/* GET home page. */
  router.get('/', function(req, res, next) {
    res.render('index');
  });


  router.get('/def/:filename', function(req, res, next) {
    var filename = req.params.filename;
    res.sendFile('formats/' + filename , { root : 'data/'});
  });

module.exports = router;
