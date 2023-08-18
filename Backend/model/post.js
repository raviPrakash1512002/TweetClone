const mongoose=require('mongoose');

const PostSchema= new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    content:{
        type: String,
        required:true,
        max:500
    },
    comments:[{
          type:mongoose.Schema.Types.ObjectId,
          ref:'Comment'
    }],
    img:{
        type:String,
        default:""
    },
    likes:[{
       type:mongoose.Schema.Types.ObjectId,
       ref:'Like'
    }],
 
},
{
    timestamps:true,
})
 module.exports=mongoose.model('Post',PostSchema);