const Sequelize = require("sequelize");
const connection = require("../database/database");

const Users = connection.define("users", {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// Essa sync deve ser feito só na primeira vez, para criação da tabela já com os relacionamentos
// Users.sync({ force: true });

module.exports = Users;
