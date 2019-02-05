module.exports = (mongoose, config) => {
  const database = mongoose.connection;
  mongoose.Promise = Promise;

  mongoose.connect(config.database, {
    useMongoClient: true,
    promiseLibrary: global.Promise
  });

  database.on('error', error => console.log(`Connection to RetailManager database failed: ${error}`));
  database.on('connected', () => console.log('Connected to RetailManager database'));
  database.on('disconnected', () => console.log('Disconnected from RetailManager database'));

  process.on('SIGINT', () => {
    database.close(() => {
      console.log('RetailManager terminated, connection closed');
      process.exit(0);
    })
  });
};
