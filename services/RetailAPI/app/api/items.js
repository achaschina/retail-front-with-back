const mongoose = require('mongoose');

const api = {};

api.getAll = (User, Items, Token) => (req, res) => {
    if (Token) {
        Items.find({ user_id: req.query.user_id }, (error, items) => {
        if (error) return res.status(400).json(error);
        res.status(200).json(items);
        return true;
      })
    } else return res.status(403).send({ success: false, message: 'Unauthorized' });
  }

  api.index = (User, Items, Token) => (req, res) => {
    if (Token) {
      User.findOne({ _id: req.query.user_id }, (error, user) => {
        if (error) res.status(400).json(error);
  
        if (user) {
            Items.findOne({ _id: req.query._id }, (error, item) => {
            if (error) res.status(400).json(error);
            res.status(200).json(item);
          })
        } else {
          res.status(400).json({ success: false, message: "Invalid item" })
        }
      })
  
    } else return res.status(401).send({ success: false, message: 'Unauthorized' });
  }

module.exports = api;
