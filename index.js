const express = require("express");
const mongoose = require("mongoose");
const expHbs = require("express-handlebars");
const homeRoutes = require("./routes/home");
const coursesRoutes = require("./routes/courses");
const addRoutes = require("./routes/add");
const cardRoutes = require("./routes/card");

const app = express();

const hbs = expHbs.create({
    defaultLayout: "main",
    extname: "hbs",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/", homeRoutes);
app.use("/courses", coursesRoutes);
app.use("/add", addRoutes);
app.use("/card", cardRoutes);

const PORT = process.env.PORT || 3000;

const start = async () => {
    try {
        const url = `mongodb+srv://edward:VLvt4zhjvkTo3bkt@bookshop.o9wo3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        app.listen(PORT, () => {
            console.log("server started on port " + PORT);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
