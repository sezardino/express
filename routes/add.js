const { Router } = require("express");
const book = require("../models/book");

const router = Router();

router.get("/", (_, response) => {
    response.render("add", {
        isAdd: true,
        title: "Add book",
    });
});

router.post("/", async (request, response) => {
    const { image, name, price } = request.body;
    const book = new book({ name, image, price, user: request.user });

    await book.save();

    response.redirect("/books");
});

module.exports = router;
