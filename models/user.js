const { model, Schema } = require("mongoose");

const user = new Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    cart: {
        items: [
            {
                count: { type: Number, required: true, default: 1 },
                book: {
                    type: Schema.Types.ObjectId,
                    ref: "Book",
                    required: true,
                },
            },
        ],
    },
});

user.methods.addToCart = function (book) {
    const items = [...this.cart.items];
    const index = items.findIndex(
        (item) => item.book.toString() === book.id.toString()
    );
    const item = items[index];
    if (item) {
        item.count = item.count + 1;
    } else {
        const data = {
            book,
            count: 1,
        };
        items.push(data);
    }

    this.cart = { items };

    return this.save();
};

user.methods.removeFromCart = function (id) {
    let items = [...this.cart.items];
    const index = items.findIndex(
        (item) => item.book.id.toString() === id.toString()
    );
    const item = items[index];
    if (item.count > 1) {
        item.count = item.count - 1;
    } else {
        items = items.filter((item) => item.book.id.toString() !== id.toString());
    }

    this.cart = { items };

    return this.save();
};

module.exports = model("User", user);
