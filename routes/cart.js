const { Router } = require("express");
const Book = require("../models/book");

const router = Router();

router.get("/", async (request, response) => {
    // const cart = await cart.fetch();
    response.render("cart", {
        iscart: true,
        title: "Cart",
        // books: cart.books,
        // price: cart.price,
    });
});

router.post("/add", async (request, response) => {
    const id = request.body.id;
    const book = await Book.findById(id);
    request.user.addToCart(book);

    response.redirect("/cart");
});

router.delete("/remove/:id", async (request, response) => {
    const id = request.params.id;
    const cart = await cart.remove(id);
    response.status(200).json(cart);
});

module.exports = router;
