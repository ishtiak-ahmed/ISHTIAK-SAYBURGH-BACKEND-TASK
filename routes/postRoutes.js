const express = require('express');
const router = express.Router();
const protect = require('../Middleware/auth');

const postController = require('../controllers/postControllers');

router.route('/getAllPosts').get(postController.getAllPosts);
router.route('/getPost/:id').get(postController.getSinglePost);
router.route('/addNewPost').post(postController.addNewPost);
router.route('/deletePost/:id').delete(postController.deletePost);
router.route('/updatePost/:id').patch(postController.updatePost);

module.exports = router;