const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./database/database");

const categoriesRoutes = require("./routes/CategoriesRoutes");
const articlesRoutes = require("./routes/ArticlesRoutes");

const Article = require("./articles/Article");
const Category = require("./categories/Category");

const app = express();

// View engine
app.set("view engine", "ejs");

// Static
app.use(express.static("public"));

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.unsubscribe(bodyParser.json());

// Database
connection
  .authenticate()
  .then(() => {
    console.log("Conexão feita com sucesso");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/", categoriesRoutes);
app.use("/", articlesRoutes);

app.get("/", (req, res) => {
  Article.findAll({
    order: [["id", "DESC"]],
  }).then((articles) => {
    res.render("index", { articles: articles });
  });
});

app.get("/:slug", (req, res) => {
  var slug = req.params.slug;
  Article.findOne({
    where: {
      slug: slug,
    },
  })
    .then((article) => {
      if (article !== undefined) {
        res.render("article", { article: article });
      } else {
        res.redirect("/");
      }
    })
    .catch((err) => {
      res.redirect("/");
    });
});

app.listen(3001, () => {
  console.log("O servidor está rodando!");
});
