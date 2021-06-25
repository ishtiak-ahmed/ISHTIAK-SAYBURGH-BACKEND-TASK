const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: [true, 'This Title is already exists. Give a new one'],
    },
    tags: {
        type: Array,
        default: [],
    },
    date: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        required: true,
    },
    authorID: {
        type: String,
        required: true,
    },
    authorName: {
        type: String,
        required: true,
    },
    // postID: {
    //     type: String,
    //     required: true,
    //     index: true,
    // }
});

module.exports = Post = mongoose.model('Post', postSchema);