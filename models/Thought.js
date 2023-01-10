const { Schema, Types, model } = require("mongoose");
const Reaction = require("./Reaction");

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: (timestamp) => {
                let date = "";
                if((new Date(timestamp).getDate()) % 10  === 1) {
                    date = `${new Date(timestamp).getDate()}st`
                } else if((new Date(timestamp).getDate()) % 10  === 2) {
                    date = `${new Date(timestamp).getDate()}nd`
                } else if((new Date(timestamp).getDate()) % 10  === 3) {
                    date = `${new Date(timestamp).getDate()}rd`
                } else {
                    date = `${new Date(timestamp).getDate()}th`
                }
                let fullDate = new Date(timestamp).toString().split(" ");
                let time = new Date(timestamp).toLocaleTimeString('en-US').split(/\s*(?::| )\s*/);
                return `${fullDate[1]} ${date}, ${fullDate[3]} at ${time[0]}:${time[1]} ${time[3]}`;
            },
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [Reaction],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);

thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});

const Thought = new model("Thought", thoughtSchema);

module.exports = Thought;
