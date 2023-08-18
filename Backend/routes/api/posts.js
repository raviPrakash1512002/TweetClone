const express =require('express');
const router=express.Router();
const postApi = require('../../controllers/api/v1/post.js');

const authenticate = require('../../config/middleware.js');
router.post('/create',authenticate,postApi.createpost);
router.get('/',postApi.getpost);
// router.post('/signup',);
module.exports= router;