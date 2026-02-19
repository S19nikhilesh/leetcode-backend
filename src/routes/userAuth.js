const express=require('express');
const authRouter=express.Router();
const {register,login,logout}=require("../controllers/userAutent")

authRouter.post('/register',register);
authRouter.post('/login',login);
authRouter.post('/logout',logout);
// authRouter.post('/admin/register',adminRegister)
// authRouter.get('/getprofile',getprofile);

module.exports= authRouter;
