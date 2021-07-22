document.querySelectorAll(".price").forEach((price) => {
    price.textContent = new Intl.NumberFormat("pl-PL", {
        currency: "pln",
        style: "currency",
    }).format(price.textContent);
});

document.querySelector(".js-card").addEventListener("click", (evt) => {
    const target = evt.target;
    console.log(target.classList.contains("js-delete"));
    if (target.classList.contains("js-delete")) {
        const id = target.dataset.id;
        console.log(target);
        fetch(`/card/remove/${id}`, { method: "DELETE" });
    }
});
