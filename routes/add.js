const { Router } = require("express");

const router = Router();

router.get("/", (_, response) => {
    response.render("add", {
        isAdd: true,
        title: "Add Course",
    });
});

router.post("/", (request, response) => {
    console.log(request.body);

    response.redirect("/courses");
});

module.exports = router;
