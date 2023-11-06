function createGame() {
  let titleInput = document.getElementById("title");
  let yearInput = document.getElementById("year");
  let priceInput = document.getElementById("price");

  var game = {
    title: String(titleInput.value),
    year: Number(yearInput.value),
    price: Number(priceInput.value),
  };

  axios
    .post("http://localhost:3002/game", game, axiosConfig)
    .then((res) => {
      if (res.status === 200) {
        alert("Game cadastrado!");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function deleteGame(listItem) {
  let id = listItem.getAttribute("data-id");
  axios
    .delete("http://localhost:3002/game/" + id, axiosConfig)
    .then((res) => {
      alert("Game Deletado com Sucesso!");
    })
    .then((err) => {
      console.log(err);
    });
}

function loadForm(listItem) {
  let id = listItem.getAttribute("data-id");
  let title = listItem.getAttribute("data-title");
  let year = listItem.getAttribute("data-year");
  let price = listItem.getAttribute("data-price");

  document.getElementById("idEdit").value = id;
  document.getElementById("titleEdit").value = title;
  document.getElementById("yearEdit").value = year;
  document.getElementById("priceEdit").value = price;
}

function updateGame() {
  let idInput = document.getElementById("idEdit");
  let titleInput = document.getElementById("titleEdit");
  let yearInput = document.getElementById("yearEdit");
  let priceInput = document.getElementById("priceEdit");

  var game = {
    title: String(titleInput.value),
    year: Number(yearInput.value),
    price: Number(priceInput.value),
  };

  let id = Number(idInput.value);

  axios
    .put("http://localhost:3002/game/" + id, game, axiosConfig)
    .then((res) => {
      if (res.status === 200) {
        alert("Game atualizado!");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function login(event) {
  event.preventDefault();
  let emailField = document.getElementById("email");
  let passwordField = document.getElementById("password");

  let email = emailField.value;
  let password = passwordField.value;

  axios
    .post("http://localhost:3002/auth/", {
      email,
      password,
    })
    .then((res) => {
      const token = res.data.token;
      localStorage.setItem("token", token);
      axiosConfig.headers.Authorization = "Bearer " + localStorage.getItem("token");
    })
    .catch((err) => {
      alert("Login inválido!");
      console.log(err);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  const formElement = document.getElementById("formLogin");
  formElement.addEventListener("submit", login);
});
