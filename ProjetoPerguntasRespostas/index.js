const express = require("express");
const app = express();

// configuração do EJS
app.set("view engine", "ejs");

// roteamento
app.get("/:nome/:lang", (req, res) => {
  var nome = req.params.nome;
  var lang = req.params.lang;
  var exibirMsg = false;
  var produtos = [
    { nome: "Doritos", preco: 9.99 },
    { nome: "Fandangos", preco: 8.99 },
    { nome: "Coca-Cola", preco: 7.99 },
  ];
  res.render("index", {
    nome: nome,
    lang: lang,
    msg: exibirMsg,
    produtos: produtos,
  });
});

app.listen(8080, () => {
  console.log("App rodando!");
});
