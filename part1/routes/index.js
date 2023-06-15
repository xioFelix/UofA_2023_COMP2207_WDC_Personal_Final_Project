var express = require('express');
var mysql = require('mysql2');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/allBooks', function (req, res, next) {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }

    var query = "SELECT * FROM Books;";
    connection.query(query, function (err1, rows, fields) {
      connection.release();
      if (err1) {
        console.error(err1);
        res.sendStatus(500);
        return;
      }
      res.json(rows);
    });
  });
});

router.get('/messages', function(req, res) {
    // Get all messages for a seller from the database and send them as a response
});

router.post('/sendMessage', function(req, res) {
    // Store the new message in the database
});

module.exports = router;
