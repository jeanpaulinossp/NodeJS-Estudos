const express = require("express");
const routerArticles = express.Router();
const Category = require("../categories/Category");
const Article = require("../articles/Article");
const slugify = require("slugify");
const adminAuth = require("../middlwares/adminAuth");

routerArticles.get("/admin/articles", adminAuth, (req, res) => {
  Article.findAll({
    include: [{ model: Category }],
  }).then((articles) => {
    res.render("admin/articles/index", { articles: articles });
  });
});

routerArticles.get("/admin/articles/new", adminAuth, (req, res) => {
  Category.findAll().then((categories) => {
    res.render("admin/articles/new", { categories: categories });
  });
});

routerArticles.post("/articles/save", adminAuth, (req, res) => {
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

routerArticles.post("/articles/delete", adminAuth, (req, res) => {
  var id = req.body.id;
  if (id !== undefined) {
    if (!isNaN(id)) {
      Article.destroy({
        where: {
          id: id,
        },
      }).then(() => {
        res.redirect("/admin/articles");
      });
    } else {
      res.redirect("/admin/articles");
    }
  } else {
    res.redirect("/admin/articles");
  }
});

routerArticles.get("/admin/articles/edit/:id", adminAuth, (req, res) => {
  var id = req.params.id;
  Article.findByPk(id)
    .then((article) => {
      if (article !== undefined) {
        Category.findAll().then((categories) => {
          console.log(categories);
          console.log(article);
          res.render("admin/articles/edit", { categories: categories, article: article });
        });
      } else {
        res.redirect("/");
      }
    })
    .catch((err) => {
      res.redirect("/");
    });
});

routerArticles.post("/articles/update", adminAuth, (req, res) => {
  var id = req.body.id;
  var title = req.body.title;
  var body = req.body.body;
  var category = req.body.category;

  Article.update(
    {
      title: title,
      body: body,
      categoryId: category,
      slug: slugify(title),
    },
    {
      where: {
        id: id,
      },
    }
  )
    .then(() => {
      res.redirect("/admin/articles");
    })
    .catch((err) => {
      res.redirect("/");
    });
});

routerArticles.get("/articles/page/:num", (req, res) => {
  var page = Number(req.params.num);
  var offset = 0;

  if (isNaN(page) || page === 1) {
    res.redirect("/");
  } else {
    offset = (page - 1) * 4;
  }

  Article.findAndCountAll({
    limit: 4,
    offset: offset,
    order: [["id", "DESC"]],
  }).then((articles) => {
    var next;
    if (offset + 4 >= articles.count) {
      next = false;
    } else {
      next = true;
    }
    var result = { page: page, next: next, articles: articles };
    Category.findAll().then((categories) => {
      res.render("admin/articles/page", { result: result, categories: categories });
    });
  });
});

module.exports = routerArticles;
