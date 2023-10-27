let Reader = require("./Reader");
let Processor = require("./Processor");
let Table = require("./Table");
let HtmlParser = require("./HtmlParser");

let leitor = new Reader();

async function main() {
  let dados = await leitor.Read("./users.csv");
  let dadosProcessador = Processor.Process(dados);
  let usuarios = new Table(dadosProcessador);
  let html = await HtmlParser.Parse(usuarios);

  console.log(html);
}

main();
