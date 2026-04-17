const express=require('express');
const aiRouter=express.Router();
const userMiddleware=require("../middlewares/userMiddleware")
aiRouter.get("/chat",userMiddleware,solveDoubt);

module.exports=aiRouter;