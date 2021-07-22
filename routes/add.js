const { Router } = require("express");
const Book = require("../models/book");

const router = Router();

router.get("/", (_, response) => {
    response.render("add", {
        isAdd: true,
        title: "Add book",
    });
});

router.post("/", async (request, response) => {
    const { image, name, price } = request.body;
    const book = new Book({ name, image, price, user: request.user });

    await book.save();

    response.redirect("/books");
});

module.exports = router;
