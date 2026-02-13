const express= require('express');
const app=express();
require('dotenv').config();
const main=require('./config/db');

app.use(express.json());
app.use(cookieParser());

main()
.then(async()=>{
    app.listen(process.env.PORT,()=>{
        console.log("Server Listening at PORT number:"+ process.env.PORT);
    })
}).catch(
    (err)=>console.log("Error Occured:"+err)
)
