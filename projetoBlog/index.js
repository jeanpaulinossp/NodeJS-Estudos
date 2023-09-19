const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// View engine
app.set("view engine", "ejs");

// Static
app.use(express.static("public"));

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.unsubscribe(bodyParser.json());

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(3001, () => {
  console.log("O servidor está rodando!");
});
