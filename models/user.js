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
                bookId: {
                    type: Schema.Types.ObjectId,
                    ref: "book",
                    required: true,
                },
            },
        ],
    },
});

module.exports = model("User", user);
