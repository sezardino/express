const fs = require("fs");
const path = require("path");

class Course {
    constructor({ name, price, img }) {
        this.name = name;
        this.price = price;
        this.img = img;
        this.id = Date.now();
    }

    toData() {
        return {
            name: this.name,
            img: this.img,
            id: this.id,
            price: this.price,
        };
    }

    async save() {
        const courses = await Course.getAll();
        courses.push(this.toData());

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, "..", "data", "courses.json"),
                JSON.stringify(courses),
                (error) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve();
                    }
                }
            );
        });
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, "..", "data", "courses.json"),
                "utf-8",
                (error, content) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(JSON.parse(content));
                    }
                }
            );
        });
    }
}

module.exports = Course;
