const express =require('express');
const router=express.Router();
const likeApi = require('../../controllers/api/v1/likes.js');
const authenticate = require('../../config/middleware.js');
router.post('/toggle',authenticate,likeApi.toggleLike);

router.get('/',authenticate,likeApi.getLikes);
module.exports= router;