var express = require('express');
var router = express.Router();

var testObject = {
  user: "Parikshit",
  class: "DIoT",
  subject: "Edge Computing"
}

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req,body);
  res.render('index', { title: 'IOT',user: 'Parikshit' });
});
router.get('/someData', function(req, res, next) {
  res.send('index', { title: 'You have logged in' });
});

module.exports = router;