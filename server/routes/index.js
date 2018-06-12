const express = require('express');
const router = express.Router();

const getAllData = require('./api/get-data');
const saveData = require('./api/save-data');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {});
});

router.get('/api/users', getAllData);

module.exports = router;
