const Post = require("../models/PostModel")
const mongoose = require("mongoose");
const ObjectID = mongoose.ObjectID;
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
        res.status(400).json({status: 'Failed', message: 'No post finds.'})
    }
}

exports.addNewPost = async (req, res) => {
    try {
    const newPost = await Post.create(req.body);
    res.status(201).json({
        data: {
            post: newPost
        }
    })
    }
    catch(err){
        res.status(400);
        throw new Error({message: 'Invalid data sent'})
    }
}

exports.deletePost = async (req,res) => {
    const id = req.body;
    console.log(id)
    res.send(`Post with this id will be deleted- ` )
}

exports.updatePost = async (req, res) => {
    console.log('update post req received');
    const id = req.body._id;
    Post.findOne({_id: id}).then((err, doc) => {
        res.send(doc);
    })
}

exports.getSinglePost = async (req, res) => {
    try{
        const id = req.body.id;
        const post = await Post.findById(id)
        res.send(post)
    }catch(err){
        res.status(400).json({message: 'Something went wrong '})
    }
}