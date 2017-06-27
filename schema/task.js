var mongoose = require('mongoose');
var DateOnly = require('mongoose-dateonly')(mongoose);
var Schema = mongoose.Schema;

// var Task = require('./task');

var User = require('./user');

var schema = new Schema({
name:        {type: String, required: true},
description: {type: String, required: true},
due:         {type: Date, required: true},
complete:    {type: Boolean, default: false},
time:        {type: Number, requird: true},
points:      {type: Number, default: 0},
user: {type: Schema.Types.ObjectId, ref: 'User'}
});

schema.post('remove', function (task) {
    User.findById(task.user, function (err, user) {
        user.tasks.pull(task);
        user.save();
    });
});

module.exports = mongoose.model('Task', schema);
