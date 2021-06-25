const express = require('express');
const router = express.Router();
const protect = require('../Middleware/auth');

const postController = require('../controllers/postControllers');

router.route('/getAllPosts').get(postController.getAllPosts);
router.route('/getPost/:id').get(postController.getSinglePost);
router.route('/addNewPost').post(postController.addNewPost);
router.route('/deletePost').delete(protect, postController.deletePost);
router.route('/updatePost').patch(protect, postController.updatePost);

module.exports = router;