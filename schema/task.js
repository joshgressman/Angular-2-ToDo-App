var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// var Task = require('./task');

var schema = new Schema({
name:        {type: String, required: true},
description: {type: String, required: true},
due:         {type: String, required: true},
complete:    {type: Boolean, default: false},
time:        {type: Number, requird: true},
points:      {type: Number, default: 0}
});

module.exports = mongoose.model('Task', schema);
