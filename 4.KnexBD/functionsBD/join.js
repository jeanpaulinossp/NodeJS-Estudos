// unir em uma consulta várias tabelas

// left join e rightjoin retorna os resultados mesmo que não tenha relacionamento
// innerJoin retorna os resultados com relacionamento e desconsidera os nulos
// o as serve para trazer a resposta com um name diferente. Usado quando há nome de tabelas iguais
database
  .select(["games.*", "estudios.nome as estudio.nome"])
  .table("games")
  .innerJoin("estudios", "estudios.game_id", "games.id")
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

// join com where
database
  .select(["games.*", "estudios.nome as estudio.nome"])
  .table("games")
  .innerJoin("estudios", "estudios.game_id", "games.id")
  .where("games.id", 12)
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

// join de um para vários com lógica para trazer os dados de forma usável
database
  .select(["games.*", "estudios.nome as estudio_nome"])
  .table("games")
  .innerJoin("estudios", "estudios.game_id", "games.id")
  .then((data) => {
    let gamesArray = [];

    data.forEach((row) => {
      let existingGame = gamesArray.find((game) => game.id === row.id);
      if (!existingGame) {
        existingGame = {
          id: row.id,
          nome: row.nome,
          estudios: [],
        };
        gamesArray.push(existingGame);
      }
      if (row.nome) {
        existingGame.estudios.push({ nome: row.estudio_nome });
      }
    });

    console.dir(gamesArray, { depth: null });
  })
  .catch((err) => {
    console.log(err);
  });
