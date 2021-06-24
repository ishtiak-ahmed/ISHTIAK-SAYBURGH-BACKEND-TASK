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
    id: {
        type: String,
        unique: true
    },
    content: {
        type: String,
        required: true,
    }
    // image: {
    //     type: File,
    //     required: true
    // },
});

module.exports = Post = mongoose.model('Post', postSchema);