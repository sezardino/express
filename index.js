const express = require("express");
const mongoose = require("mongoose");
const expHbs = require("express-handlebars");
const Handlebars = require("handlebars");
const {
    allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const homeRoutes = require("./routes/home");
const coursesRoutes = require("./routes/courses");
const addRoutes = require("./routes/add");
const cardRoutes = require("./routes/card");
const User = require("./models/user");

const app = express();

const hbs = expHbs.create({
    defaultLayout: "main",
    extname: "hbs",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(async (request, response, next) => {
    try {
        const user = await User.findById("60f95978d6a9b138782f3617");
        request.user = user;
        next();
    } catch (error) {
        console.log(error);
    }
});

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/", homeRoutes);
app.use("/courses", coursesRoutes);
app.use("/add", addRoutes);
app.use("/card", cardRoutes);

const PORT = process.env.PORT || 3000;

const start = async () => {
    try {
        const url = `mongodb+srv://edward:VLvt4zhjvkTo3bkt@bookshop.o9wo3.mongodb.net/shop`;

        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });

        const candidate = await User.findOne();

        if (!candidate) {
            const user = new User({
                name: "Edward",
                email: "admin@admin.admin",
                cart: { items: [] },
            });

            await user.save();
        }

        app.listen(PORT, () => {
            console.log("server started on port " + PORT);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
