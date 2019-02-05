const mongoose = require('mongoose');

const api = {};

api.signup = (User) => (req, res) => {
  console.log(req.body)
  if (!req.body.username || !req.body.password) res.json({ success: false, message: 'Please, pass an username and password.' });
  else {
    const user = new User({
      username: req.body.username,
      password: req.body.password
    });

    user.save(error => {
      if (error) return res.status(400).json({ success: false, message: 'Username already exists.' });
      res.json({ success: true, message: 'Account created successfully' });
    });
  }
}

// для отладки
api.setup = (User) => (req, res) => {
  console.log('setup adm')
  const admin = new User({
    username: 'admin',
    password: 'admin',
    clients: []
  });
admin.save(error => {
    if (error) throw error;
console.log('Admin account was succesfully set up');
    res.json({ success: true });
  })
}

api.index = (User, BudgetToken) => (req, res) => {
  const token = BudgetToken;
if (token) {
    User.find({}, (error, users) => {
      if (error) throw error;
      res.status(200).json(users);
    });
  } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}
// для отладки

module.exports = api;
