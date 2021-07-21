const { Router } = require("express");

const router = Router();

router.get("/", (_, response) => {
    response.render("add", {
        isAdd: true,
        title: "Add Course",
    });
});

module.exports = router;
