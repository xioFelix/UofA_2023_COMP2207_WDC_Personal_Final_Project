var express = require('express');
var mysql = require('mysql2');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/allUsers', function (req, res, next) {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }
    var query = "SELECT * from Users;";
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

router.get('/allAds', function (req, res, next) {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }

    var query = "SELECT Ads.ad_id, Ads.ISBN, Books.title, Books.author, Books.price, Books.image, Sellers.seller_id, Sellers.location, Users.user_name AS seller_name FROM Ads JOIN Books ON Ads.ISBN = Books.ISBN JOIN Sellers ON Ads.seller_id = Sellers.seller_id JOIN Users ON Sellers.user_id = Users.user_id;";
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

    var query = "INSERT INTO Messages (ISBN, user_id, seller_id, message) VALUES (?, ?, ?, ?);";
    var params = [req.body.ISBN, req.body.user_id, req.body.seller_id, req.body.message];
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


router.post('/getChatHistory', function (req, res, next) {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }
    var query = "SELECT * FROM Messages WHERE user_id = ? ORDER BY message_date DESC;";
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

module.exports = router;
