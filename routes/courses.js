const { Router } = require("express");

const router = Router();

router.get("/", (_, response) => {
    response.render("courses", {
        isCourses: true,
        title: "All Courses",
    });
});

module.exports = router;
