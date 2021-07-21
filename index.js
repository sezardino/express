const express = require("express");
const expHbs = require("express-handlebars");
const homeRoute = require("./routes/home");
const coursesRoute = require("./routes/courses");
const addRoute = require("./routes/add");

const app = express();

const hbs = expHbs.create({
    defaultLayout: "main",
    extname: "hbs",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.static("public"));
app.use("/", homeRoute);
app.use("/courses", coursesRoute);
app.use("/add", addRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("server started on port " + PORT);
});
