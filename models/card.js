const path = require("path");
const fs = require("fs");

const cardFilePath = path.join(__dirname, "..", "data", "card.json");

class Card {
    static async add(course) {
        const card = await Card.fetch();

        const courseIndex = card.courses.findIndex(
            (item) => item.id === course.id
        );
        const courseInCard = card.courses[courseIndex];

        if (courseInCard) {
            courseInCard.count++;
        } else {
            course.count = 1;
            card.courses.push(course);
        }

        card.price += +course.price;

        return new Promise((resolve, reject) => {
            fs.writeFile(cardFilePath, JSON.stringify(card), (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }

    static async remove(id) {
        const card = await Card.fetch();

        const courseIndex = card.courses.findIndex((item) => +item.id === +id);
        const course = card.courses[courseIndex];

        if (course.count === 1) {
            // delete
            card.courses = card.courses.filter((item) => item.id != course.id);
        } else {
            // count --
            course.count--;
        }

        card.price -= course.price;

        return new Promise((resolve, reject) => {
            fs.writeFile(
                cardFilePath,
                JSON.stringify(card),
                (error, content) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(content);
                    }
                }
            );
        });
    }

    static async fetch() {
        return new Promise((resolve, reject) => {
            fs.readFile(cardFilePath, "utf-8", (error, content) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(JSON.parse(content));
                }
            });
        });
    }
}

module.exports = Card;
