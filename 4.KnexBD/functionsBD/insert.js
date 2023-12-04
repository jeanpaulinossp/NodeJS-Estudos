var dados = [
  {
    nome: "Sea of thieves",
    preco: 50.99,
  },
  {
    nome: "World of Warcraft",
    preco: 160.99,
  },
  {
    nome: "Tibia",
    preco: 99.99,
  },
  {
    nome: "Call of Duty Moukj",
    preco: 109.99,
  },
  {
    nome: "Histuky",
    preco: 49.99,
  },
];

// inserir dados na tabela games
database
  .insert(dados)
  .into("games")
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

// INSERT ASSOCIATIONS
database
  .insert({
    nome: "Blizzard",
    game_id: 12,
  })
  .table("estudios")
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
