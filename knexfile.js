if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD
    },
    migrations: {
      tableName: 'migrations'
    }
  },

  test: {
    client: 'sqlite3',
    connection: ':memory:',
    useNullAsDefault: true,
    migrations: {
      tableName: 'migrations'
    },
    seeds: {
      directory: 'seeds/test'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      database: 'nim_bot',
      user: 'miqdad',
      password: 'anone'
    },
    migrations: {
      tableName: 'migrations'
    }
  },
};