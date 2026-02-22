const User= require('../Models/users');
const validate=require('../utils/validator')
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const redisClient=require('../config/redis');

const register= async(req,res)=>{
    try{

        //valdiate toh karway ahi nhi , pehle validator banao 
        validate(req.body)

        const {firstName,emailId,password}=req.body;
        //bina hashing ke password store hota hai kya be? 
        req.body.password=await bcrypt.hash(password,10);
        
        //if email alredy exixts yeh khud hi error fenk dega    
        const user= await User.create(req.body);
        //token bhi generate karwa de jwt.sign({emailId},"secet_key",{expiresIn: 60*60});
        const token=jwt.sign({_id:user._id,emailId:emailId},process.env.JWT_KEY,{expiresIn: 60*60});
        res.cookie("token",token,{maxAge: 60*60*1000 });
        res.status(201).send("User Registered Successfully");
        //new resource created status:201

    }catch(err){
        res.status(400).send("Error:"+err);// status code 400: bad request 
    }
}

const login=async(req,res)=>{
    try{
        const {emailId,password}=req.body;

        if(!emailId)
            throw new Error("Invalid Credentials");
        if(!password)
            throw new Error("Invalid Credentials");

        const user=await User.findOne({emailId});

        const match=await bcrypt.compare(password,user.password)

        if(!match)
            throw new Error("Invalid Credentials");

        const token=jwt.sign({_id:user._id,emailId:emailId},process.env.JWT_KEY,{expiresIn: 60*60});
        res.cookie("token",token,{maxAge: 60*60*1000 });
        res.status(200).send("User Login Successfully"); //ok

    }catch(err){
        res.status(401).send("Error:"+err);// status code 401: unauthorized access:authentiaction required
    }
}

const logout=async(req,res)=>{
    try{
        //validate the token -middleware se hogya


        //add it to redis ka bloaklist
        const {token}=req.cookies;
        const paylaod=jwt.decode(token);

        await redisClient.set(`token:${token}`,"Blocked");
        await redisClient.expireAt(`token:${token}`,paylaod.exp);
        //added  it to redis ka bloacklist

        //clear the coookies
        res.cookie("token",null,new Date(Date.now())); // khali token bheja , aur abhi hi expire karde isko 
        res.send("Logged out Successfully");
    }catch(err){
        res.status(401).send("Error:",err);
    }
}

module.exports={register,login,logout}

