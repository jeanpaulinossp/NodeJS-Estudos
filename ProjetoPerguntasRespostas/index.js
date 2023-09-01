const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// configuração do EJS
app.set("view engine", "ejs");

// configuração para carregar arquivos estaticos
app.use(express.static("public"));

// configuração do bodyParser para envio do form
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// roteamento
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {
  var titulo = req.body.titulo;
  var descricao = req.body.descricao;
  res.send(`${titulo} e ${descricao}`);
});

app.listen(8080, () => {
  console.log("App rodando!");
});
