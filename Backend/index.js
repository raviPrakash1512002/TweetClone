const express = require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const dotenv = require('dotenv');



const app=express();
dotenv.config();
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use(express.json());
app.use('/',require('./routes'));


// connect with mongodb
mongoose.connect(process.env.MONGO_DB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('mongodb connected is successfully!!!');
}).catch((err)=>{
    console.log(err.message)
})



const PORT=process.env.PORT || 3000;

app.listen(PORT,(err)=>{
    if(err){
        console.error(`Error in running the server :${PORT}`);
    }
    console.log(`Server successfully running on port :${PORT}`);
})