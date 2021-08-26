const express =require('express');
const app=express();
const dotenv=require('dotenv')
require('dotenv').config();
app.listen(process.env.PORT,(error)=>{
    if(error){
        console.log(error)
    }
    console.log('the server has been started on port  '+process.env.PORT)
})

