var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../schema/user');
var Task = require('../schema/task');

// GET ALL TASKS

router.get('/', function (req, res){
console.log("getting all tasks");
Task.find({'complete': 'false'}, function (err, data){
  if (err) {
      console.log("Couldnt Get deal task " , err);
      res.sendStatus(500);
    } else {
      console.log('task found');
      res.send(data);
    }
});
});

//AUTH router.use() method is reached on each request used for AUTH
//Checks for a valid token and protects the routes
//Token needs to be passed from the service, in this case task.service
router.use('/', function (req, res, next){
  jwt.verify(req.query.token, 'secret', function(err, decoded){
    if (err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }
        next();
  })
});


// ADD NEW TASK => Redo the post to take in the token
// router.post('/', function (req, res, next){
//   console.log(req.body);
//   var task = new Task({
//     name: req.body.name,
//     description: req.body.description,
//     due: req.body.due,
//     complete: req.body.complete,
//     time: req.body.time,
//     points: req.body.points
//   });
//   task.save(function(err, result){
//     if (err) {
//             return res.status(500).json({
//                 title: 'An error occurred',
//                 error: err
//             });
//         }
//         res.status(201).json({
//             message: 'User created',
//             obj: result
//         });
//   });
// });

//Post that maps task to the user taks with token
router.post('/', function(req, res, next) {
  var decoded = jwt.decode(req.query.token); //get the user paylod from the token
  User.findById(decoded.user._id, function(err, user){
    if(err){
      return res.status(500).json({
                title: 'An error occurred',
                error: err
      });
    }
    var task = new Task ({
      name: req.body.name,
      description: req.body.description,
      due: req.body.due,
      complete: req.body.complete,
      time: req.body.time,
      points: req.body.points,
      user: user
    });

    task.save(function(err, result){
      if (err) {
              return res.status(500).json({
                  title: 'An error occurred',
                  error: err
              });
          }
        user.tasks.push(result);
        user.save();
        res.status(201).json({
          message: 'Saved task',
              obj: result
        });
    });
  });
});


// router.delete('/:id', function(req, res){
//   var decoded = jwt.decode(req.query.token);
//   var id = req.params.id;
//   Task.findOneAndRemove({_id: id}, function(err, doc){
//     if(err){
//             console.log(err);
//             res.sendStatus(500);
//         } else {
//             console.log('deleted', doc);
//             res.sendStatus(200);
//         }
//   });
// });

router.delete('/:id', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Task.findById(req.params.id, function (err, message) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!message) {
            return res.status(500).json({
                title: 'No task Found!',
                error: {message: 'task not found'}
            });
        }
        if (message.user != decoded.user._id) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: {message: 'Users do not match'}
            });
        }
        message.remove(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Deleted task',
                obj: result
            });
        });
    });
});


router.get('/month', function (req, res){
console.log("getting all tasks");
Task.find({'complete': 'false', 'due': {'$gte': new Date("2017-06-01T00:00:00.000Z"), '$lte':new Date("2017-06-30T00:00:00.000Z") }}, function (err, data){
  if (err) {
      console.log("Couldnt Get deal task " , err);
      res.sendStatus(500);
    } else {
      console.log('task found');
      res.send(data);
    }
});
});

router.get('/dates/:start/:end', function (req, res){
console.log("DATA", req.params.start);
var start = req.params.start;
var end = req.params.end;
Task.find({'complete': 'false', 'due': {'$gte': new Date(start), '$lte':new Date(end) }}, function (err, data){
  if (err) {
      console.log("Couldnt Get tasks " , err);
      res.sendStatus(500);
    } else {
      console.log('task by dates found', data);
      res.send(data);
    }
});
});

module.exports = router;
