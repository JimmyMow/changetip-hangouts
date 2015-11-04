var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/main', function(req, res) {
  res.set('Content-Type', 'text/xml');
  res.render('main');
});

module.exports = router;
