const mongoose = require('mongoose');


const LikeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },

    //this define the on=bject id of the liked object
    likeable: {
        type: mongoose.Schema.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    //this field is used for defining the of the object since this is a dynamic refrence
    onModel: {
        type: String,
        required: true,
        enumL:['Post','Comment']

    }
},{
    timestamps:true
});

module.exports=mongoose.model('Like',LikeSchema);