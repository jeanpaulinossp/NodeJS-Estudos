const axiosConfig = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
};

axios
  .get("http://localhost:3002/games", axiosConfig)
  .then((response) => {
    const { games } = response.data;
    const list = document.getElementById("games");
    if (games) {
      games.map((game) => {
        let item = document.createElement("li");
        item.setAttribute("data-id", game.id);
        item.setAttribute("data-title", game.title);
        item.setAttribute("data-year", game.year);
        item.setAttribute("data-price", game.price);
        item.innerHTML = `${game.id} - ${game.title} - R$${game.price}`;

        // button para deletar
        let deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Deletar";
        deleteBtn.addEventListener("click", function () {
          deleteGame(item);
        });

        // button para editar
        let editBtn = document.createElement("button");
        editBtn.innerHTML = "Editar";
        editBtn.addEventListener("click", function () {
          loadForm(item);
        });

        list.appendChild(item);
        list.appendChild(deleteBtn);
        list.appendChild(editBtn);
      });
    }
  })
  .catch((err) => {
    console.log(err);
  });
