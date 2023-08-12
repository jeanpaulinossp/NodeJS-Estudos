const express = require("express");
const app = express();

// configuração do EJS
app.set("view engine", "ejs");

// roteamento
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(8080, () => {
  console.log("App rodando!");
});
