var express = require('express');
var router = express.Router();
var ChangeTip = require('changetip');
var change_tip = new ChangeTip({api_key: process.env.CHANGETIP_API_KEY});
var md5 = require('MD5');
var strftime = require('strftime');
var crypto = require('crypto');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/main', function(req, res) {
  res.render('main');
});

router.post('/tip', function(req, res) {
   console.log("changetip: ", change_tip);
   var sender = "108104158228107899864";
   var receiver = '111750880711215438532';
   var message = "@change here is a cent";
   var post_data = "googleplus " + sender + ": " + message;
   var encode_data = encodeURI(String(post_data));
   var encode_date = encodeURI(strftime('%Y-%m-%d:%H:%M:00', new Date()));
   var hash = crypto.createHash('md5')
   .update(encode_data)
   .update(encode_date)
   .digest('hex');

   change_tip.send_tip(hash,
                       sender,
                       receiver,
                       'googleplus',
                       '@change here is a cent',
                       {'sender_display': 'Jack', 'receiver_display': 'Change'})
   .then(function(result) {
        console.log("result: ", result);
        res.send({result: result});
    });
});

module.exports = router;
