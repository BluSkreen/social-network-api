const { Schema, Types } = require("mongoose");

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Types.ObjectId,
            default: new Types.ObjectId,
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
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
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);

module.exports = reactionSchema;
