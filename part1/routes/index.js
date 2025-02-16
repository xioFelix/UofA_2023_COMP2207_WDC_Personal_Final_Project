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
    var query = "SELECT Messages.*, Users.user_name AS sender_name FROM Messages LEFT JOIN Users ON Messages.user_id = Users.user_id WHERE Messages.user_id = ? ORDER BY message_date DESC;";
    var params = [req.body.user_id];
    connection.query(query, params, function (err, result) {
      connection.release();

      if (err) {
        console.error(err);
        res.sendStatus(500);
        return;
      }

      res.json(result);
    });
  });
});

router.post('/checkIfSeller', function (req, res, next) {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }

    var query = "SELECT * FROM Sellers WHERE user_id = ?;";
    var params = [req.body.user_id];
    connection.query(query, params, function (err, rows, fields) {
      connection.release();

      if (err) {
        console.error(err);
        res.sendStatus(500);
        return;
      }

      res.json(rows); // Return seller info if exists, otherwise return an empty array
    });
  });
});

router.post('/getSellerChatHistory', function (req, res, next) {
  req.pool.getConnection(function (connectionError, connection) {
    if (connectionError) {
      console.error(connectionError);
      res.sendStatus(500);
      return;
    }
    var query1 = "SELECT seller_id FROM Sellers WHERE user_id = ?;";
    var params1 = [req.body.seller_id];
    connection.query(query1, params1, function (queryError, result) {
      if (queryError) {
        console.error(queryError);
        res.sendStatus(500);
        return;
      }
      var seller_id = result[0] ? result[0].seller_id : undefined;
      if (seller_id) {
        var query2 = "SELECT Messages.*, Users.user_name AS sender_name FROM Messages LEFT JOIN Users ON Messages.user_id = Users.user_id WHERE Messages.seller_id = ? ORDER BY message_date DESC;";
        var params2 = [seller_id];
        connection.query(query2, params2, function (queryError2, result2) {
          connection.release();
          if (queryError2) {
            console.error(queryError2);
            res.sendStatus(500);
            return;
          }
          res.json(result2);
        });
      } else {
        res.sendStatus(404);
      }
    });
  });
});

module.exports = router;
