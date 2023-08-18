const express =require('express');
const router=express.Router();
const commentApi = require('../../controllers/api/v1/comment.js');
const authenticate = require('../../config/middleware.js');
router.post('/',authenticate,commentApi.creates);

router.get('/',authenticate,commentApi.destroy);
module.exports= router;