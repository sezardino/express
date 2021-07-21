const { Router, request, response } = require("express");
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

router.get("/:id/edit", async (request, response) => {
    const id = request.params.id
    if(!request.query.allow) {
        return response.redirect('/courses/' + id);
    }

    const course = await Course.getById(request.params.id)

    response.render("course-edit", {
        isCourses: true,
        title: `Edit ${course.name}`,
        course
    });
});

router.post("/edit", async (request, response) => {
    await Course.edit(request.body)

    response.redirect('/courses')
})

module.exports = router;
