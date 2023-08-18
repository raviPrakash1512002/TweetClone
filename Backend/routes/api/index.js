const express =require('express');
const router=express.Router();

router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/friendship',require('./friendship'));
router.use('/likes',require('./likes'));
router.use('/comments',require('./comments'));
module.exports= router;