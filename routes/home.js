const { Router } = require("express");

const router = Router();

router.get("/", (_, response) => {
  response.render("index", {
      isHome: true,
      title: "Home",
  });
});

module.exports = router;
