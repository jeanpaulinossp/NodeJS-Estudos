// where com busca identica
database
  .where({ nome: "Tibia" })
  .orWhere({ id: 2 })
  .table("games")
  .then((data) => {
    console.log(data);
  })
  .then((err) => {
    console.log(err);
  });

// where com busca like, ou seja, encontra parte
database
  .whereRaw("preco < 60")
  .table("games")
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

// passar uma query crua, ou seja, sql puro
database
  .raw("SELECT * FROM games")
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
