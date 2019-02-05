require('module-alias/register');
const http = require('http'),
      RetailAPI = require('@RetailAPI'),
      RetailManagerServer = http.Server(RetailAPI),
      RetailManagerPORT = process.env.PORT || 3001,
      LOCAL = '0.0.0.0';

RetailManagerServer.listen(RetailManagerPORT, LOCAL, () => console.log(`RetailAPI running on ${RetailManagerPORT}`));
