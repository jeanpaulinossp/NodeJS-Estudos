const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./database/database");
const session = require("express-session");

const categoriesRoutes = require("./routes/CategoriesRoutes");
const articlesRoutes = require("./routes/ArticlesRoutes");
const usersRoutes = require("./routes/UserAuth");

const Article = require("./articles/Article");
const Category = require("./categories/Category");
const Users = require("./auth/Users");

const app = express();

// View engine
app.set("view engine", "ejs");

// Sessions
app.use(
  session({
    secret: "MSNIOhioh8UBUOh9nI",
    cookie: { maxAge: 30000000 },
  })
);

// Static
app.use(express.static("public"));

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
app.use("/", usersRoutes);

app.get("/sessions", (req, res) => {
  req.session.user = {
    username: "Jean Paulino",
    email: "jean.ssparaiso@gmail.com",
    id: 0,
  };
  res.send("Sessão gerada!");
});

app.get("/leitura", (req, res) => {
  res.json({
    user: req.session.user,
  });
});

app.get("/", (req, res) => {
  Article.findAll({
    order: [["id", "DESC"]],
    limit: 4,
  }).then((articles) => {
    Category.findAll().then((categories) => {
      res.render("index", { articles: articles, categories: categories });
    });
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
      console.log(article);
      if (article != undefined) {
        Category.findAll().then((categories) => {
          res.render("article", { article: article, categories: categories });
        });
      } else {
        res.redirect("/");
      }
    })
    .catch((err) => {
      res.redirect("/");
    });
});

app.get("/category/:slug", (req, res) => {
  var slug = req.params.slug;
  Category.findOne({
    where: {
      slug: slug,
    },
    include: [{ model: Article }],
  }).then((category) => {
    if (category !== undefined) {
      Category.findAll().then((categories) => {
        res.render("index", { articles: category.articles, categories: categories });
      });
    } else {
      res.redirect("/");
    }
  });
});

app.listen(3001, () => {
  console.log("O servidor está rodando!");
});
