const mongoose = require('mongoose'),
      UserModel = require('@RetailManagerModels/user'),
      BudgetModel = require('@RetailManagerModels/budget'),
      ClientModel = require('@RetailManagerModels/client');

const models = {
  User: mongoose.model('User'),
  Budget: mongoose.model('Budget'),
  Client: mongoose.model('Client')
}

module.exports = models;
