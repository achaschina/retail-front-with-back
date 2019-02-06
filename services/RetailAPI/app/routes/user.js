const models = require('@RetailManager/app/setup')

module.exports = (app) => {
   
   const api = app.RetailAPI.app.api.user;
   console.log(api, 'rout/user')

   app.route('/api/v1/signup')
     .post(api.signup(models.User));
   }