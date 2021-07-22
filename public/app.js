const toCurrency = (price) =>
    new Intl.NumberFormat("pl-PL", {
        currency: "pln",
        style: "currency",
    }).format(price);

document.querySelectorAll(".price").forEach((price) => {
    price.textContent = toCurrency(price.textContent);
});

const card = document.querySelector(".js-card");
card.addEventListener("click", (evt) => {
    const target = evt.target;

    if (target.classList.contains("js-delete")) {
        const id = target.dataset.id;

        fetch(`/card/remove/${id}`, { method: "DELETE" })
            .then((response) => response.json())
            .then((data) => {
                if (!data.courses.length) {
                    card.innerHTML = "<p>Card is Empty</p>";
                } else {
                    const html = data.courses
                        .map(
                            (item) => `
                  <tr>
                  <td>${item.name}</td>
                  <td>${item.count}</td>
                  <td>
                      <button
                          class="btn btn-small js-delete"
                          data-id="${item.id}"
                      >
                          Delete
                      </button>
                  </td>
              </tr>
                  `
                        )
                        .join("");
                    card.querySelector("tbody").innerHTML = html;
                    card.querySelector(".price").textContent = toCurrency(
                        data.price
                    );
                }
            });
    }
});
