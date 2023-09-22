const Sequelize = require("sequelize");
const connection = require("../database/database");
const Category = require("../categories/Category");

const Article = connection.define("articles", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

// Criação de relacionamento (Uma categoria tem vários artigos) = hasMany (Um para muitos)
Category.hasMany(Article);

// Criação de relacionamento (Um artigo pertence a uma categoria) = belongsTo(Um para um)
Article.belongsTo(Category);

// Essa sync deve ser feito só na primeira vez, para criação da tabela já com os relacionamentos
// Article.sync({ force: true });

module.exports = Article;
