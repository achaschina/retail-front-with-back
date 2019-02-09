const mongoose = require('mongoose');

const Schema = mongoose.Schema({
//   id: {
//     type: String,
//     required: true
//   },

  name: {
    type: String,
    required: true
  },

  parentId: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
});

mongoose.model('Items', Schema);
