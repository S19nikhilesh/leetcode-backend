const express=require('express');
const problemRouter=express.Router();
const adminMiddleware=require("../middlewares/adminMiddleware")
const createProblem=require("../controllers/userProblem")

//admin access required for these 3
problemRouter.post("/create",adminMiddleware,createProblem);
// problemRouter.patch("/:id",updateProblem);
// problemRouter.delete("/:id",deleteProblem);

// //user access
// problemRouter.get("/:id",getProblemById);
// problemRouter.get("/",getAllProblem);

// problemRouter.get("/user",solvedProblemsByUser)

module.exports=problemRouter;