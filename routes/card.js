const { Router } = require("express");
const Card = require("../models/card");

const router = Router();

router.get("/", (request, response) => {
  response.render("card", {
    isCard: true,
    title: 'Card'
  });
});

router.post("/add", (request, response) => {
  Card.add(request.body);
});

module.exports = router;
