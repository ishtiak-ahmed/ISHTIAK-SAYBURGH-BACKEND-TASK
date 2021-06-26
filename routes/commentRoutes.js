const express = require('express');
const router = express.Router();

const commentController = require('../controllers/commentControllers');

router.route('/getPostComments/:id').get(commentController.getPostComment);
router.route('/addNewComment').post(commentController.addNewComment);

module.exports = router;
