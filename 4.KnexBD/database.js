const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: "localhost",
    user: "root",
    password: "a123456*",
    // password: "@123456*",
    database: "knexjs",
  },
});

module.exports = knex;
