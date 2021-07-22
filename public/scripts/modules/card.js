import { toCurrency } from "../helpers/index.js";

class Card {
    constructor() {
        this.selector = ".js-card";
        this.card = document.querySelector(this.selector);
        this.init();
    }

    updateTable(item) {
        return `<tr>
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
      `;
    }

    deleteItem(id) {
        fetch(`/card/remove/${id}`, { method: "DELETE" })
            .then((response) => response.json())
            .then((data) => {
                if (!data.courses.length) {
                    this.card.innerHTML = "<p>Card is Empty</p>";
                } else {
                    const html = data.courses.map(this.updateTable).join("");
                    this.body.innerHTML = html;
                    this.price.textContent = toCurrency(data.price);
                }
            });
    }

    addListeners() {
        this.card.addEventListener("click", (evt) => {
            const target = evt.target;

            if (target.classList.contains("js-delete")) {
                const id = target.dataset.id;
                this.deleteItem(id);
            }
        });
    }

    init() {
        if (this.card) {
            this.body = this.card.querySelector("tbody");
            this.price = this.card.querySelector(".price");
            this.addListeners();
        }
    }
}

export default Card;
