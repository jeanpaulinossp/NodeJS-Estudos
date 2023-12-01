const bodyParser = require("body-parser");
const express = require("express");
const flash = require("express-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.unsubscribe(cookieParser("nuncanemvi"));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);

app.use(flash());

app.get("/", (req, res) => {
  var { emailError, nomeError, idadeError, email, nome, idade } = req.flash();
  res.render("index", { emailError, nomeError, idadeError, email, nome, idade });
});

app.post("/form", (req, res) => {
  let { email, nome, idade } = req.body;
  let emailError = "O e-mail não pode ser vazio";
  let nomeError = "O nome não pode ser vazio";
  let idadeError = "A idade não pode ser vazia";

  req.flash("email", email);
  req.flash("nome", nome);
  req.flash("idade", idade);

  if (email == undefined || email == "") {
    req.flash("emailError", emailError);
    res.redirect("/");
  }
  if (nome == undefined || nome == "") {
    req.flash("nomeError", nomeError);
    res.redirect("/");
  }
  if (idade == undefined || idade == "") {
    req.flash("idadeError", idadeError);
    res.redirect("/");
  }
  return res.send("Show de bola esse form!");
});

app.listen(3002, (req, res) => {
  console.log("Servidor rodando!");
});
