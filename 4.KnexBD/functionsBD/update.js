database
  .where({ id: 12 })
  .update({ preco: 40.99 })
  .table("games")
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
