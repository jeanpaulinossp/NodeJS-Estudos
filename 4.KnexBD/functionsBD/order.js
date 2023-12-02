database
  .select()
  .table("games")
  .orderBy("preco", "asc")
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
