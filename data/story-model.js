const mongoose = require("mongoose");
const { type } = require("os");

const storySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    container: {
        name: String,
        short_name: String
    },
    media: {
        type: String,
        required: true
    },
    comments: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    user: {
        name: {
            type: String,
            required: true
        }
    }
})

mongoose.model("Story", storySchema, "stories")