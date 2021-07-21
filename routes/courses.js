const { Router, request } = require("express");
const Course = require('../models/course');

const router = Router();

router.get("/", async (_, response) => {
    const courses = await Course.getAll()

    response.render("courses", {
        isCourses: true,
        title: "All Courses",
        courses
    });
});

router.get("/:id", async (request, response) => {
    const course = await Course.getById(request.params.id)

    response.render("course", {
        layout: 'empty',
        isCourses: true,
        title: `Course ${course.name}`,
        course
    });
});

module.exports = router;
