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

module.exports = router;
