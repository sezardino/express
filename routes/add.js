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
    const course = new Course(request.body);
    console.log(request.body);
    console.log(course);
    await course.save();

    response.redirect("/courses");
});

module.exports = router;
