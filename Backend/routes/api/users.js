const express =require('express');
const router=express.Router();
const userApi = require('../../controllers/api/v1/users.js');
const authenticate = require('../../config/middleware.js');
router.post('/login',userApi.login);

router.post('/signup',userApi.signup);

router.post('/edit',authenticate,userApi.update);
router.get('/search',userApi.search);
router.get('/:id',authenticate,userApi.getUser);
module.exports= router;