const Post = require("../models/PostModel")
const decodeToken = require("../Utils/decodeToken");

exports.getAllPosts = async(req, res) => {
    const posts = await Post.find();
    if(posts){
    res.status(200).json({
        status: 'success',
        results: posts.length,
        data: {
            posts
        }
    })
    }else{
        res.status(400).json({status: 'Failed', message: 'No post found.'})
    }
}

exports.addNewPost = async (req, res) => {
    const user = await decodeToken(req.cookies.token);
    const post = req.body;
    post.authorID = user.userName;
    post.authorName = user.fullName;
    try {
        const newPost = await Post.create(post);
        res.status(201).json({
            data: {
                post: newPost
            }
        })
    }
    catch(err){
        res.status(400).json({message: 'Invalid data sent'})
    }
}

exports.deletePost = async (req,res) => {
    console.log('delete request received')
    const user = await decodeToken(req.cookies.token)
    const postID = req.params.id;
    try {
        const post = await Post.findById(postID);
        if(post.authorID === user.userName){
            await Post.findByIdAndDelete(postID);
            res.status(204).json({status: 'success'})
        }else{
            res.status(304).json({status: 'fail', message: "You can't delete other post"})
        }
    }catch(err){
        res.status(404).json({status: 'fail', message: 'Something went wrong'})
    }
}

exports.updatePost = async (req, res) => {
    const user = await decodeToken(req.cookies.token)
    const postID = req.params.id;
    try {
        const post = await Post.findById(postID);
        if(post.authorID === user.userName){
            const updatedPost = await Post.findByIdAndUpdate(postID, req.body, {new: true});
            res.status(204).json({status: 'success', post: updatedPost})
        }else{
            res.status(304).json({status: 'fail', message: "You can't edit other post"})
        }
    }catch(err){
        res.status(404).json({status: 'fail', message: 'Something went wrong'})
    }
}

exports.getSinglePost = async (req, res) => {
    try{
        const id = req.params.id;
        const post = await Post.findById(id)
        res.send(post)
    }catch(err){
        res.status(400).json({message: 'Something went wrong '})
    }
}
