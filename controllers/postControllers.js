const Post = require("../models/PostModel")
const User = require('../models/UserModel');
const mongoose = require("mongoose");
const decodeToken = require("../Utils/decodeToken");
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
        // console.log(err)
        res.status(400).json({message: 'Invalid data sent'})
    }
}

exports.deletePost = async (req,res) => {
    const id = req.body;
    console.log(id)
    res.send(`Post with this id will be deleted- ` )
}

exports.updatePost = async (req, res) => {
    console.log('update post req received');
    const id = req.params.id;
    console.log(id)
    // Post.findOne({_id: id}).then((err, doc) => {
    //     res.send(doc);
    // })
    res.send('post will be updated..')
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