const express = require("express");
const expHbs = require("express-handlebars");
const path = require("path");

const app = express();

const hbs = expHbs.create({
    defaultLayout: "main",
    extname: "hbs",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.static("public"));

app.get("/", (_, response) => {
    response.render("index", {
        isHome: true,
        title: "Home",
    });
});

app.get("/courses", (_, response) => {
    response.render("courses", {
        isCourses: true,
        title: "All Courses",
    });
});

app.get("/add", (_, response) => {
    response.render("add", {
        isAdd: true,
        title: "Add Course",
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("server started on port " + PORT);
});
