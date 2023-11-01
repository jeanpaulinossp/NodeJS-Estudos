axios
  .get("http://localhost:3002/games")
  .then((response) => {
    const { data } = response;
    const list = document.getElementById("games");
    if (data) {
      data.map((game) => {
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
