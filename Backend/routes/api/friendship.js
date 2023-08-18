const express =require('express');
const router=express.Router();
const friendApi = require('../../controllers/api/v1/friends.js');
const authenticate = require('../../config/middleware.js');
router.post('/create_friendship',authenticate,friendApi.addandremoveFriend);
router.post('/remove_friendship',authenticate,friendApi.addandremoveFriend);
router.get('/fetch_user_friends',authenticate,friendApi.getallfriends);
module.exports= router;