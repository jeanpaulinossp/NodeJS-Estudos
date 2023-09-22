const Sequelize = require("sequelize");
const connection = require("../database/database");

const Category = connection.define("categories", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// Essa sync deve ser feito só na primeira vez, para criação da tabela já com os relacionamentos
// Category.sync({ force: true });

module.exports = Category;
