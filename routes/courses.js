const { Router } = require("express");
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

module.exports = router;
