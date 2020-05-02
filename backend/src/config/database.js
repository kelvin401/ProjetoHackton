require('../bootstrap')

module.exports = {
  dialect: process.env.DB_DIALECT || 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'hero',
  storage: './__tests__/database.sqlite',
  logging: false,
  define: {
    timestamps: true,
    underscored: true
  }

}
