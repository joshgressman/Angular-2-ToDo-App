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
    email:    req.body.email
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

//*** SIGNIN POST WITH TOKEN *** ///
router.post('/signin', function(req, res, next){
  User.findOne({email: req.body.email}, function(err, user){
    if (err) {
          return res.status(500).json({
              title: 'An error occurred',
              error: err
          });
      }
    if (!user) {
              return res.status(401).json({
                  title: 'Login failed',
                  error: {message: 'Invalid login credentials'}
              });
        }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
              return res.status(401).json({
                  title: 'Login failed',
                  error: {message: 'Invalid login credentials'}
              });
        }
    //jwt.sign() creates a new token, payload is the user info being passed secret is for varifivation
     var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
     res.status(200).json({ //send token to the client
       message: 'Successfully logged in',
       token: token,
       userId: user._id
     });
  });
});

//*** END SIGN IN *** ///

module.exports = router;
