var express = require('express');
var mysql = require('mysql2');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/allAds', function (req, res, next) {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }

    var query = "SELECT a.ad_id, a.ISBN, b.title, b.author, b.price, b.image, s.seller_id, s.location, u.user_name FROM Ads a JOIN Books b ON a.ISBN = b.ISBN JOIN Sellers s ON a.seller_id = s.seller_id JOIN Users u ON s.user_id = u.user_id;";
    connection.query(query, function (err, rows, fields) {
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


router.post('/contactSeller', function (req, res, next) {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }

    var query = "INSERT INTO Messages (ISBN, buyer, seller, message) VALUES (?, ?, ?, ?);";
    var params = [req.body.ISBN, req.body.buyer, req.body.seller, req.body.message];
    connection.query(query, params, function (err, result) {
      connection.release();

      if (err) {
        console.error(err);
        res.sendStatus(500);
        return;
      }

      res.sendStatus(200);
    });
  });
});

module.exports = router;
