const express = require("express");
const routerCategories = express.Router();
const Category = require("../categories/Category");

// slugify otimiza a string para que seja passado como parametro na url, tirando acentos, espaços e etc
const slugify = require("slugify");

routerCategories.get("/admin/categories/new", (req, res) => {
  res.render("admin/categories/new");
});

routerCategories.post("/categories/save", (req, res) => {
  var title = req.body.title;
  if (title !== undefined || title === "") {
    Category.create({
      title: title,
      slug: slugify(title),
    }).then(() => {
      res.redirect("/admin/categories");
    });
  } else {
    res.redirect("/admin/categories/new");
  }
});

routerCategories.get("/admin/categories", (req, res) => {
  Category.findAll().then((categories) => {
    res.render("admin/categories/index", { categories: categories });
  });
});

routerCategories.post("/categories/delete", (req, res) => {
  var id = req.body.id;
  if (id !== undefined) {
    if (!isNaN(id)) {
      Category.destroy({
        where: {
          id: id,
        },
      }).then(() => {
        res.redirect("/admin/categories");
      });
    } else {
      res.redirect("/admin/categories");
    }
  } else {
    res.redirect("/admin/categories");
  }
});

routerCategories.get("/admin/categories/edit/:id", (req, res) => {
  var id = req.params.id;

  if (isNaN(id)) {
    res.redirect("/admin/categories");
  }

  Category.findByPk(id)
    .then((category) => {
      if (category !== undefined) {
        res.render("admin/categories/edit", { category: category });
      } else {
        res.redirect("/admin/categories");
      }
    })
    .catch((err) => {
      res.redirect("/admin/categories");
    });
});

routerCategories.post("/categories/update", (req, res) => {
  var id = req.body.id;
  var title = req.body.title;

  Category.update(
    {
      title: title,
      slug: slugify(title),
    },
    {
      where: {
        id: id,
      },
    }
  ).then(() => {
    res.redirect("/admin/categories");
  });
});

module.exports = routerCategories;
