const express=require('express')
const submitRouter=express.Router();
const submitCode=require("../controllers/userSubmission")

const userMiddleware=require('../middlewares/userMiddleware')
submitRouter.post('/submit/:id',userMiddleware,submitCode);

module.exports=submitRouter