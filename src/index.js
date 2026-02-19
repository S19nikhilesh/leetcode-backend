const express= require('express');
const app=express();
require('dotenv').config();
const main=require('./config/db');
const authRouter=require("./routes/userAuth")
const cookieParser = require('cookie-parser');
const redisClient=require("./config/redis")

app.use(express.json());
app.use(cookieParser());

app.use('/user',authRouter);

const InitializeConnection=async () => {
    try{

        await Promise.all([main(),redisClient.connect()])
        console.log("Connected to both DB");

        app.listen(process.env.PORT,()=>{
                    console.log("Server Listening at PORT number:"+ process.env.PORT);
                }
        )
    }catch{
    (err)=>console.log("Error Occured:"+err)
}
}

InitializeConnection();

// main()
// .then(async()=>{
//     app.listen(process.env.PORT,()=>{
//         console.log("Server Listening at PORT number:"+ process.env.PORT);
//     })
// }).catch(
//     (err)=>console.log("Error Occured:"+err)
// )
