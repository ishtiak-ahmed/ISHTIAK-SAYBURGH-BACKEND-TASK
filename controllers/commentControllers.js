const Comment = require('../models/CommentModel');
const decodeToken = require('../Utils/decodeToken');

exports.addNewComment = async (req, res) => {
    const user = await decodeToken(req.cookies.token);
    const comment = req.body;
    comment.authorID = user.userName;
    comment.commenterName = user.fullName;
    try {
        const newComment = await Comment.create(comment);
        res.status(201).json({
            data: {
                comment: newComment
            }
        })
    }
    catch(err){
        console.log(err)
        res.status(400).json({message: 'Invalid data sent'})
    }
}

exports.getPostComment = async (req, res) => {
    const postID = req.params.id;
    const comments = await Comment.find({postID});
    res.status(200).json({status: 'success', comments: comments})
}