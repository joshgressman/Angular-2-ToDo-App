var express = require('express');
var router = express.Router();

var Task = require('../schema/task');

router.get('/', function (req, res){
console.log("getting completed tasks");
Task.find({'complete': 'true'}, function (err, data){
  if (err) {
      console.log("Couldnt Get deal task " , err);
      res.sendStatus(500);
    } else {
      console.log('task found');
      res.send(data);
    }
});
});

//Completed task updateToComplete

router.put('/:id', function(req, res){
  console.log("req.body", req.body);
  // var data = req.params.data;
  var id = req.params.id;

  Task.findOneAndUpdate({_id: id}, {$set: { complete: true, points: 20}}, function(err, doc){
    if (err) {
        console.log("Couldnt update task " , err);
        res.sendStatus(500);
      } else {
        console.log('task updated');
        res.sendStatus(200);
      }
  });
});


module.exports = router;
