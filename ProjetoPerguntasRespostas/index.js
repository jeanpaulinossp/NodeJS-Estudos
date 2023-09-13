const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

// Database Sequelize
connection
  .authenticate()
  .then(() => {
    console.log("Conexão feita com sucesso!");
  })
  .catch((msgErro) => {
    console.log(msgErro);
  });

// configuração do EJS
app.set("view engine", "ejs");

// configuração para carregar arquivos estaticos
app.use(express.static("public"));

// configuração do bodyParser para envio do form
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// roteamento
app.get("/", (req, res) => {
  // o raw é para trazer somente os dados da tabela
  Pergunta.findAll({ raw: true, order: [["id", "DESC"]] }).then((perguntas) => {
    res.render("index", {
      perguntas: perguntas,
    });
  });
});

app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {
  var nome = req.body.nome;
  var titulo = req.body.titulo;
  var descricao = req.body.descricao;
  // o create é para salvar a pergunta no BD
  Pergunta.create({
    nome: nome,
    titulo: titulo,
    descricao: descricao,
  }).then(() => {
    res.redirect("/");
  });
});

app.get("/pergunta/:id", (req, res) => {
  var id = req.params.id;
  Pergunta.findOne({
    where: { id: id },
  }).then((pergunta) => {
    if (pergunta !== undefined) {
      Resposta.findAll({
        where: { perguntaId: pergunta.id },
        order: [["id", "DESC"]],
      }).then((respostas) => {
        res.render("pergunta", {
          pergunta: pergunta,
          respostas: respostas,
        });
      });
    } else {
      res.redirect("/");
    }
  });
});

app.post("/responder", (req, res) => {
  var nome = req.body.nome;
  var corpo = req.body.corpo;
  var perguntaId = req.body.pergunta;
  Resposta.create({
    nome: nome,
    corpo: corpo,
    perguntaId: perguntaId,
  }).then(() => {
    res.redirect("/pergunta/" + perguntaId);
  });
});

app.listen(8080, () => {
  console.log("App rodando!");
});
