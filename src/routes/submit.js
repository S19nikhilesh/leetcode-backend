const express=require('express')
const submitRouter=express.Router();
const {submitCode,runCode}=require("../controllers/userSubmission")

const userMiddleware=require('../middlewares/userMiddleware')
submitRouter.post('/submit/:id',userMiddleware,submitCode);
submitRouter.post('/run/:id',userMiddleware,runCode)
module.exports=submitRouter