var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var User = require('../schema/user');

//*** SIGNUP POST ***
router.post('/', function(req,res,next){
  console.log('req.body', req.body);
  var user = new User ({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10),
    email:    req.body.password
  });
  user.save(function(err, result) {
    if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'User created',
            obj: result
        });
  });
});


//***END SIGN UP

module.exports = router;
