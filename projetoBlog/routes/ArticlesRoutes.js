const express = require("express");
const routerArticles = express.Router();
const Category = require("../categories/Category");
const Article = require("../articles/Article");
const slugify = require("slugify");

routerArticles.get("/admin/articles", (req, res) => {
  res.send("ROTA DE ARTIGOS");
});

routerArticles.get("/admin/articles/new", (req, res) => {
  Category.findAll().then((categories) => {
    res.render("admin/articles/new", { categories: categories });
  });
});

routerArticles.post("/articles/save", (req, res) => {
  var title = req.body.title;
  var body = req.body.body;
  var category = req.body.category;

  Article.create({
    title: title,
    slug: slugify(title),
    body: body,
    categoryId: category,
  }).then(() => {
    res.redirect("/admin/articles");
  });
});

module.exports = routerArticles;
