const mongoose=require('mongoose');


const CommentSchema=mongoose.Schema({
    content:{
        type:String,
        require:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Like"
        }
    ]
},
{
    timestamps:true
});

module.exports=mongoose.model("Comment",CommentSchema);