document.querySelectorAll(".price").forEach((price) => {
  price.textContent = new Intl.NumberFormat("pl-PL", {
    currency: "pln",
    style: "currency",
  }).format(price.textContent);
});
