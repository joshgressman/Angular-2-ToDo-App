var express = require('express');
var router = express.Router();

var Task = require('../schema/task');

// ADD NEW TASK
router.post('/', function (req, res, next){
  console.log(req.body);
  var task = new Task({
    name: req.body.name,
    description: req.body.description,
    due: req.body.due,
    complete: req.body.complete
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
Task.find({}, function (err, data){
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

module.exports = router;
