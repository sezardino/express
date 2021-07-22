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
