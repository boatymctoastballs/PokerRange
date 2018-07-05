var express = require('express');
var router = express.Router();
const math = require('mathjs');

/* GET combinations of hands */
router.get('/', function(req, res, next){
const comb = math.combinations([1,2,3,4], 2)
});

module.exports = router;