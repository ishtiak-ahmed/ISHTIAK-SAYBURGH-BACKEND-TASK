const express = require('express');
const router = express.Router();

const postController = require('../controllers/postControllers');

router.route('/addNewPost').post(postController.addNewPost);
router.route('/getAllPosts').get(postController.getAllPosts);
router.route('/getPost/:id').get(postController.getSinglePost);
router.route('/updatePost/:id').patch(postController.updatePost);
router.route('/deletePost/:id').delete(postController.deletePost);

module.exports = router;
