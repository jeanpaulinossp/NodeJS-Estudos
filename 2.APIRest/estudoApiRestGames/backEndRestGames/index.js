import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from "jsonwebtoken";

const JWTSecret = "mwdqioahd84234iu308a556915.++-.5djsidjksasasae2ytr43yuwp||zzasq;.,][ççpç";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function auth(req, res, next) {
  const authToken = req.headers["authorization"];
  if (authToken !== undefined) {
    const bearer = authToken.split(" ");
    const token = bearer[1];
    jwt.verify(token, JWTSecret, (err, data) => {
      if (err) {
        res.json({ err: "Token inválido." });
        res.sendStatus(401).end();
      } else {
        req.token = token;
        req.loggedUser = { id: data.id, email: data.email };
        next();
      }
    });
  } else {
    res.json({ err: "Token inválido." });
    res.sendStatus(401).end();
  }
}

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
  users: [
    {
      id: 1,
      name: "Jean Carlos",
      email: "jean.ssparaiso@gmail.com",
      password: "nodejs@1",
    },
    {
      id: 2,
      name: "Jean Paulino",
      email: "jeanpaulino.ssp@gmail.com",
      password: "nodejs@2",
    },
  ],
};

app.get("/games", auth, (req, res) => {
  res.json({ user: req.loggedUser, games: DB.games });
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

app.post("/auth", (req, res) => {
  let { email, password } = req.body;
  if (email !== undefined) {
    const user = DB.users.find((user) => user.email === email);

    if (user !== undefined) {
      if (user.password === password) {
        jwt.sign(
          { id: user.id, email: user.email },
          JWTSecret,
          { expiresIn: "24h" },
          (err, token) => {
            if (err) {
              res.json({ err: "Falha interna." });
              res.sendStatus(401).end();
            } else {
              res.json({ token: token });
            }
          }
        );
      } else {
        res.json({ err: "Credenciais inválidas." });
        res.sendStatus(401).end();
      }
    } else {
      res.json({ err: "O email enviado não existe." });
      res.sendStatus(404).end();
    }
  } else {
    res.json({ err: "O email enviado é inválido." });
    res.sendStatus(400).end();
  }
});

app.listen(3002, () => {
  console.log("API Rodando");
});