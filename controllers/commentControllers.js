const Comment = require('../models/CommentModel');

exports.addNewComment = async (req, res) => {
    console.log('New comment received..')
    const newComment = new Comment(req.body);
    newComment.save().then(doc => res.send(doc)).catch(err => res.status(400).json({failed: err}))
}

exports.getPostComment = async (req, res) => {
    const postID = req.params.id;
    const comments = await Comment.find({postID});
    res.status(200).json({status: 'success', comments: comments})
}