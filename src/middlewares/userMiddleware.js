const jwt=require("jsonwebtoken");
const User = require("../Models/users");
const userMiddleware=async (req,res,next) => {
    try{
        const {token}=req.cookies;
        if(!token){
            throw new Error("Token is not present");
            const payload=jwt.verify(token,process.env.JWT_KEY);

            const {_id}=payload;

            if(!id)
                throw new Error("Invalid Token, ID is missing");

            const result=await User.findById(_id);
            if(!result)
                throw new Error("User doesn't Exists");

            //check redis blocklist
        }
    }catch(err){
        res.send("Error:"+err.message);
    }
}