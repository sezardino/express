const { Router } = require("express");
const Book = require("../models/book");
const User = require("../models/user");

const router = Router();

const formatCartItems = (items) =>
    items.map((item) => ({
        count: item.count,
        ...item.book._doc,
    }));

const calculatePrice = (items) =>
    items.reduce((total, item) => total + item.price * item.count, 0);

router.get("/", async (request, response) => {
    const user = await request.user.populate("cart.items.book").execPopulate();

    const cartItems = formatCartItems(user.cart.items);

    response.render("cart", {
        isCart: true,
        title: "Cart",
        books: cartItems,
        price: calculatePrice(cartItems),
    });
});

router.post("/add", async (request, response) => {
    const id = request.body.id;
    const book = await Book.findById(id);
    try {
        await request.user.addToCart(book);
        response.redirect("/cart");
    } catch (error) {
        console.log(error);
    }
});

router.delete("/remove/:id", async (request, response) => {
    const id = request.params.id;
    const user = await request.user.populate("cart.items.book").execPopulate();
    try {
        await request.user.removeFromCart(id);
        const cartItems = formatCartItems(user.cart.items);
        const cart = {
            price: calculatePrice(cartItems),
            books: cartItems,
        };

        response.status(200).json(cart);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
