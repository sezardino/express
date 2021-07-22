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
    const index = items.findIndex((item) => item._id === book._id);
    const item = items[index];
    if (item) {
        // count++
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

module.exports = model("User", user);
