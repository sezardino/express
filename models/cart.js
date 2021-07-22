const path = require("path");
const fs = require("fs");

const cartFilePath = path.join(__dirname, "..", "data", "cart.json");

class cart {
    static async add(book) {
        const cart = await cart.fetch();

        const bookIndex = cart.books.findIndex(
            (item) => item.id === book.id
        );
        const bookIncart = cart.books[bookIndex];

        if (bookIncart) {
            bookIncart.count++;
        } else {
            book.count = 1;
            cart.books.push(book);
        }

        cart.price += +book.price;

        return new Promise((resolve, reject) => {
            fs.writeFile(cartFilePath, JSON.stringify(cart), (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }

    static async remove(id) {
        const cart = await cart.fetch();

        const bookIndex = cart.books.findIndex((item) => +item.id === +id);
        const book = cart.books[bookIndex];

        if (book.count === 1) {
            // delete
            cart.books = cart.books.filter((item) => item.id != book.id);
        } else {
            // count --
            book.count--;
        }

        cart.price -= book.price;

        return new Promise((resolve, reject) => {
            fs.writeFile(cartFilePath, JSON.stringify(cart), (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(cart);
                }
            });
        });
    }

    static async fetch() {
        return new Promise((resolve, reject) => {
            fs.readFile(cartFilePath, "utf-8", (error, content) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(JSON.parse(content));
                }
            });
        });
    }
}

module.exports = cart;
