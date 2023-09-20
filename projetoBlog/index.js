const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./database/database");

const categoriesRoutes = require("./routes/CategoriesRoutes");
const articlesRoutes = require("./routes/ArticlesRoutes");

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
  res.render("index");
});

app.listen(3001, () => {
  console.log("O servidor está rodando!");
});
