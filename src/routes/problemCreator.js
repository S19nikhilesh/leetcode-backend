const express=require('express');
const problemRouter=express.Router();
const adminMiddleware=require("../middlewares/adminMiddleware")
const userMiddleware=require("../middlewares/userMiddleware")

const {createProblem,updateProblem,deleteProblem,getProblemById,getAllProblem,getSolvedProblemsByUser}=require("../controllers/userProblem")

//admin access required for these 3 only
problemRouter.post("/create",adminMiddleware,createProblem);
problemRouter.put("/update/:id",adminMiddleware,updateProblem);
problemRouter.delete("/delete/:id",adminMiddleware,deleteProblem);

//user access
problemRouter.get("/ProblemById/:id",userMiddleware,getProblemById);
problemRouter.get("/getAllProblem",userMiddleware,getAllProblem);

problemRouter.get("/solvedProblemsByUser",userMiddleware,getSolvedProblemsByUser);

module.exports=problemRouter;