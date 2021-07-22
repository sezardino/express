import { toCurrency } from "../helpers/index.js";

class Price {
    constructor() {
        this.selector = ".price";
        this.elements = document.querySelectorAll(this.selector);

        this.init();
    }

    init() {
        this.elements.forEach((item) => {
            item.textContent = toCurrency(item.textContent);
        });
    }
}

export default Price;
