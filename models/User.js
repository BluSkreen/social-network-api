const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            index: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            index: true,
            unique: true,
            match: `/^\w+@\w+\.\w+$/`,
            // match: `/^\w[\w\d\.-_]{0,30}@\w{2,}[\w-]*\w\.\w{2,}/`,
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thought",
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
    }
);

userSchema.virtual("friendcount").get(function () {
    return this.friends.length;
});

const User = model("User", userSchema);

module.exports = User;
