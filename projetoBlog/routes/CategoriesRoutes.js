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
      res.redirect("/");
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
  console.log("esse é o id", id);
  if (id !== undefined) {
    console.log("entrei aqui primeiro");
    if (!isNaN(id)) {
      console.log("entrei aqui depois");
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

module.exports = routerCategories;
