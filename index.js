const express = require("express");
const app = express();

app.listen(3000, function (err) {
  if (err) {
    console.log("Ocorreu um erro");
  } else {
    console.log("Servidor Funcionando!");
  }
});
