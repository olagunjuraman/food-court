module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'food-court.ci0gunhnw2g8.us-east-1.rds.amazonaws.com',
      user: 'postgres',
      password: 'foodcourtpassword',
      database: 'postgres',
    },
    migrations: {
      directory: './src/migrations',
    },
    seeds: {
      directory: './src/seeds',
    },
  },
  // other environments go here...
};
