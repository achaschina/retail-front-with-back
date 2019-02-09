const mongoose = require('mongoose'),
      UserModel = require('@RetailManagerModels/user'),
      BudgetModel = require('@RetailManagerModels/budget'),
      ClientModel = require('@RetailManagerModels/client');
      ItemModel = require('@RetailManagerModels/item');

const models = {
  User: mongoose.model('User'),
  Budget: mongoose.model('Budget'),
  Items: mongoose.model('Items'),
  Client: mongoose.model('Client')
}

module.exports = models;
