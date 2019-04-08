const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  favouriteGenre: {
    type: String,
    required: true,
    minlength: 2
  }
})
Schema.plugin(uniqueValidator)

module.exports = mongoose.model('User', Schema)
