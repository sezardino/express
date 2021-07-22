const toCurrency = (price) =>
    new Intl.NumberFormat("pl-PL", {
        currency: "pln",
        style: "currency",
    }).format(price);

export { toCurrency };
