var express = require('express');
var mysql = require('mysql2');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/allBooks', function (req, res, next) {
  //Connect to the database
  req.pool.getConnection(function (err, connection) {
    if (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }

    var query = "SELECT * FROM Books;";
    connection.query(query, function (rows, fields) {
      connection.release();
      if (err) {
        console.error(err);
        res.sendStatus(500);
        return;
      }
      res.json(rows);
    });
  });
});


module.exports = router;
