const { Router } = require("express");
const Course = require("../models/course");

const router = Router();

router.get("/", (_, response) => {
    response.render("add", {
        isAdd: true,
        title: "Add Course",
    });
});

router.post("/", async (request, response) => {
    const { image, name, price } = request.body;
    const course = new Course({ name, image, price });

    await course.save();

    response.redirect("/courses");
});

module.exports = router;
