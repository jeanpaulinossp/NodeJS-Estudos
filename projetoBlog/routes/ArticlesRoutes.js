const express = require("express");
const routerArticles = express.Router();

routerArticles.get("/articles", (req, res) => {
  res.send("ROTA DE ARTIGOS");
});

routerArticles.get("/admin/articles/new", (req, res) => {
  res.send("ROTA PARA CRIAR UM NOVO ARTIGO");
});

module.exports = routerArticles;
