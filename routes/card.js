const { Router } = require("express");
const Course = require("../models/course");
const Card = require("../models/card");

const router = Router();

router.get("/", async (request, response) => {
    const card = await Card.fetch();
    response.render("card", {
        isCard: true,
        title: "Card",
        courses: card.courses,
        price: card.price,
    });
});

router.post("/add", async (request, response) => {
    const course = await Course.getById(request.body.id);
    Card.add(course);

    response.redirect("/card");
});

router.delete("/remove/:id", async (request, response) => {
    const id = request.params.id;
    const card = Card.remove(id);
    response.status(200).json(card)
});

module.exports = router;
