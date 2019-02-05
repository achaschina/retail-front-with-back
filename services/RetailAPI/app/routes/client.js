const passport = require('passport'),
      config = require('@config'),
      models = require('@RetailManager/app/setup');

module.exports = (app) => {
  const api = app.RetailAPI.app.api.client;

  app.route('/api/v1/client')
     .post(passport.authenticate('jwt', config.session), api.store(models.User, models.Client, app.get('budgetsecret')))
     .get(passport.authenticate('jwt', config.session), api.getAll(models.User, models.Client, app.get('budgetsecret')))
     .delete(passport.authenticate('jwt', config.session), api.remove(models.User, models.Client, app.get('budgetsecret')))

  app.route('/api/v1/client/single')
    .get(passport.authenticate('jwt', config.session), api.index(models.User, models.Client, app.get('budgetsecret')))
    .put(passport.authenticate('jwt', config.session), api.edit(models.User, models.Client, app.get('budgetsecret')))
}
