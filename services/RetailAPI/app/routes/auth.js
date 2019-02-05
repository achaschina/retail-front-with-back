const models = require('@RetailManager/app/setup');

module.exports = (app) => {
  const api = app.RetailAPI.app.api.auth;
  console.log('routers/auth')

  app.route('/')
     .get((req, res) => res.send('Retail Manager API'));

  app.route('/api/v1/auth')
     .post(api.login(models.User));
}
