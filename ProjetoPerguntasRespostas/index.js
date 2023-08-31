const express = require("express");
const app = express();

// configuração do EJS
app.set("view engine", "ejs");

// configuração para carregar arquivos estaticos
app.use(express.static("public"));

// roteamento
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {
  res.send("Formulário recebido");
});

app.listen(8080, () => {
  console.log("App rodando!");
});
