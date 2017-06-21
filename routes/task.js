var express = require('express');
var router = express.Router();

var User = require('../schema/user');
var Task = require('../schema/task');

// ADD NEW TASK
router.post('/', function (req, res, next){
  console.log(req.body);
  var task = new Task({
    name: req.body.name,
    description: req.body.description,
    due: req.body.due,
    complete: req.body.complete,
    time: req.body.time,
    points: req.body.points
  });
  task.save(function(err, result){
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

router.delete('/:id', function(req, res){
  console.log('Delete route hit');
  var id = req.params.id;
  console.log("req body server delete task", id);

  Task.findOneAndRemove({_id: id}, function(err, doc){
    if(err){
            console.log(err);
            res.sendStatus(500);
        } else {
            console.log('deleted', doc);
            res.sendStatus(200);
        }
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
