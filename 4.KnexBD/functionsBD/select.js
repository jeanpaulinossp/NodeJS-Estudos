database
  .select()
  .table("games")
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
