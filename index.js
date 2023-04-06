const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("Bem vindo ao servidor!!!");
});

app.get("/blog/:artigo?", function (req, res) {
  var artigo = req.params.artigo;

  if (artigo) {
    res.send(`Esse é o blog, ${artigo}`);
  } else {
    res.send("Esse é o blog");
  }
});

app.get("/canal/youtube", function (req, res) {
  var canal = req.query["canal"];
  if (canal) {
    res.send(`${canal}"Esse é o canal do Youtube"`);
  } else {
    res.send(`"Esse é o canal do Youtube"`);
  }
});

app.get("/ola/:nome/:empresa", function (req, res) {
  var nome = req.params.nome;
  var empresa = req.params.empresa;

  res.send(`<h1>Oi, ${nome} ${empresa}</h1>`);
});

app.listen(3000, function (err) {
  if (err) {
    console.log("Ocorreu um erro");
  } else {
    console.log("Servidor Funcionando!");
  }
});
