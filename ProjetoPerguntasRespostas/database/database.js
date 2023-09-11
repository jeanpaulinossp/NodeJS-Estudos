const Sequelize = require("sequelize");

const connection = new Sequelize("guiaperguntas", "root", "a123456*", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = connection;
