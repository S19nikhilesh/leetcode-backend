const express=require('express');
const problemRouter=express.Router();

//admin access required for these 3
problemRouter.post("/create",problemCreate);
problemRouter.patch("/:id",problemUpdate);
problemRouter.delete("/:id",probleemDelete);

//user access
problemRouter.get("/:id",problemFetch);
problemRouter.get("/",problemFetchAll);

problemRouter.get("/user",solvedProblem)