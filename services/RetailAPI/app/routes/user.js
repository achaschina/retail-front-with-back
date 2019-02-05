const models = require('@RetailManager/app/setup'),
   config = require('@config'),
   passport = require('passport');

module.exports = (app) => {
   
   const api = app.RetailAPI.app.api.user;
   // console.log(api, 'rout/user')

   app.route('/api/v1/signup')
      .post(api.signup(models.User));

   app.route('/api/v1/setup')
      .post(api.setup(models.User));

   app.route('/api/v1/users')
      .get(passport.authenticate('jwt', config.session), api.index(models.User, app.get('budgetsecret')));
}


// const passport = require('passport'),
//       config = require('@config'),
//       models = require('@RetailManager/app/setup');
// module.exports = (app) => {
//    console.log('routers/user', app.RetailManagerAPI)
//   const api = app.RetailManagerAPI.app.api.user;
//   app.route('/api/v1/setup')
//      .post(api.setup(models.User))
//   app.route('/api/v1/users')
//      .get(passport.authenticate('jwt', config.session),  api.index(models.User, app.get('budgetsecret')));
//   app.route('/api/v1/signup')
//      .post(api.signup(models.User));
// }