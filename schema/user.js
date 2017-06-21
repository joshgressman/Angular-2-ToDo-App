var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  email: { type: String, required: true, unique: true},
  tasks: [{type: Schema.Types.ObjectId, ref: 'Task'}]
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);
