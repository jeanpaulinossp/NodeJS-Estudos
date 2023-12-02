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
