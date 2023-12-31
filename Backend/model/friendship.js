const mongoose = require('mongoose');


const friendSchema = new mongoose.Schema({
    from_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    to_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{timeStamps:true});

module.exports= mongoose.model('Friendship',friendSchema);
