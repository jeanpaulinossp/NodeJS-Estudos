import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const DB = {
  games: [
    {
      id: 1,
      title: "Call of Duty MW",
      year: 2019,
      price: 60,
    },
    {
      id: 2,
      title: "Sea of thieves",
      year: 2018,
      price: 40,
    },
    {
      id: 3,
      title: "Minecraft",
      year: 2012,
      price: 20,
    },
  ],
};

app.get("/games", (req, res) => {
  res.json(DB.games);
});

app.get("/game/:id", (req, res) => {
  let id = req.params.id;
  if (isNaN(id)) {
    res.sendStatus(400).end();
  } else {
    let game = DB.games.find((g) => g.id === parseInt(id));
    if (game !== undefined) {
      res.json(game);
    } else {
      res.sendStatus(404).end();
    }
  }
});

app.post("/game", (req, res) => {
  let { title, year, price } = req.body;
  if (typeof title === "string" && typeof year === "number" && typeof price === "number") {
    DB.games.push({
      id: 5000,
      title,
      price,
      year,
    });
    res.sendStatus(200).end();
  } else {
    res.sendStatus(400).end();
  }
});

app.delete("/game/:id", (req, res) => {
  let id = req.params.id;
  if (isNaN(id)) {
    res.sendStatus(400).end();
  } else {
    let index = DB.games.findIndex((g) => g.id === parseInt(id));
    if (index === -1) {
      res.sendStatus(404).end();
    } else {
      DB.games.splice(index, 1);
      res.sendStatus(200).end();
    }
  }
});

app.put("/game/:id", (req, res) => {
  let id = req.params.id;
  if (isNaN(id)) {
    res.sendStatus(400).end();
  } else {
    let game = DB.games.find((g) => g.id === parseInt(id));
    if (game !== undefined) {
      var { title, price, year } = req.body;

      if (title !== undefined && typeof title === "string") {
        game.title = title;
      }

      if (price !== undefined && typeof price === "number") {
        game.price = price;
      }

      if (year !== undefined && typeof year === "number") {
        game.year = year;
      }
      res.sendStatus(200).end();
    } else {
      res.sendStatus(404).end();
    }
  }
});

app.listen(3002, () => {
  console.log("API Rodando");
});
