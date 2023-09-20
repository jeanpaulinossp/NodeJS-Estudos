const express = require("express");
const routerCategories = express.Router();

routerCategories.get("/categories", (req, res) => {
  res.send("ROTA DE CATEGORIAS");
});

routerCategories.get("/admin/categories/new", (req, res) => {
  res.send("ROTA PARA CRIAR UMA NOVA CATEGORIA");
});

module.exports = routerCategories;
