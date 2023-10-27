let Reader = require("./Reader");

let leitor = new Reader();

async function main() {
  let dados = await leitor.Read("./users.csv");
  console.log(dados);
}

main();
