const express=require('express');
const authRouter=express.Router();
const {register,login,logout}=require("../controllers/userAutent")
const userMiddleware=require('../middlewares/userMiddleware')

authRouter.post('/register',register);
authRouter.post('/login',login);
authRouter.post('/logout',userMiddleware,logout);
// authRouter.post('/admin/register',adminRegister)
// authRouter.get('/getprofile',getprofile);

module.exports= authRouter;
