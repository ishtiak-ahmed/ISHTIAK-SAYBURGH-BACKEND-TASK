const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    commenterName: {
        type: String,
        required: true
    },
    postID: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    content: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    }
})

module.exports = Comment = mongoose.model('comment', commentSchema);
