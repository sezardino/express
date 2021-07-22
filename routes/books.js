const { Router } = require("express");
const book = require("../models/book");

const router = Router();

router.get("/", async (_, response) => {
    const books = await book.find();

    response.render("books", {
        isbooks: true,
        title: "All books",
        books,
    });
});

router.get("/:id", async (request, response) => {
    const book = await book.findById(request.params.id);

    response.render("book", {
        layout: "empty",
        isbooks: true,
        title: `book ${book.name}`,
        book,
    });
});

router.get("/:id/edit", async (request, response) => {
    const id = request.params.id;
    if (!request.query.allow) {
        return response.redirect("/books/" + id);
    }

    const book = await book.findById(request.params.id);

    response.render("book-edit", {
        isbooks: true,
        title: `Edit ${book.name}`,
        book,
    });
});

router.post("/edit", async (request, response) => {
    try {
        const { id } = request.body;
        await book.findByIdAndUpdate(id, request.body);

        response.redirect("/books");
    } catch (error) {
        console.log(error);
    }
});

router.post("/delete", async (request, response) => {
    try {
        const { id } = request.body;
        await book.deleteOne({ _id: id });
        response.redirect("/books");
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
