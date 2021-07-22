import { toCurrency } from "../helpers/index.js";

class Cart {
    constructor() {
        this.selector = ".js-cart";
        this.cart = document.querySelector(this.selector);
        this.init();
    }

    updateTable(item) {
        return `<tr>
                  <td>${item.name}</td>
                  <td>${item.count}</td>
                  <td>
                      <button
                          class="btn btn-small js-delete"
                          data-id="${item._id}"
                      >
                          Delete
                      </button>
                  </td>
              </tr>
      `;
    }

    deleteItem(id) {
        fetch(`/cart/remove/${id}`, { method: "DELETE" })
            .then((response) => response.json())
            .then((data) => {
                if (!data.books.length) {
                    this.cart.innerHTML = "<p>Cart is Empty</p>";
                } else {
                    console.log(data);
                    const html = data.books.map(this.updateTable).join("");
                    this.body.innerHTML = html;
                    this.price.textContent = toCurrency(data.price);
                }
            });
    }

    addListeners() {
        this.cart.addEventListener("click", (evt) => {
            const target = evt.target;

            if (target.classList.contains("js-delete")) {
                const id = target.dataset.id;
                this.deleteItem(id);
            }
        });
    }

    init() {
        if (this.cart) {
            this.body = this.cart.querySelector("tbody");
            this.price = this.cart.querySelector(".price");
            this.addListeners();
        }
    }
}

export default Cart;
