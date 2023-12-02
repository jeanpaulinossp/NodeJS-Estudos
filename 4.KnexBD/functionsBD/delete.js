database
  .where({ id: 13 })
  .delete()
  .table("games")
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
