var express = require('express');
var router = express.Router();
var ChangeTip = require('changetip');
var change_tip = new ChangeTip({api_key: process.env.CHANGETIP_API_KEY});
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
   var sender = req.body.sender;
   var receiver = req.body.receiver;
   var message = req.body.message;
   console.log("message: ", message);
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
                       req.body.message,
                       {'sender_display': req.body.sender_display, 'receiver_display': req.body.receiver_display})

   .then(function(result) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.send({result: result});
    });
});

module.exports = router;
