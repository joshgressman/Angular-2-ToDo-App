var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// var Task = require('./task');

var schema = new Schema({
name:        {type: String, required: true},
description: {type: String, required: true},
due:         {type: String, required: true},
complete:    {type: String, default: false},
});

module.exports = mongoose.model('Task', schema);
