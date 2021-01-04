const mongoose = require('mongoose');

let today = new Date();
let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
let dateTime = date+' '+time;

const postSchema = new mongoose.Schema({
    imgUrl: {
        type: String,
        maxlength: 1500,
        minlength: 2,
        required: false,
    },
    text: {
        type: String,
        required: false,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: String,
        default: dateTime
    },
    comment: [
        {
           aaa: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
            },
            comment: {
                type: String,
            }
            
        } 
    ],
    like:[

    ]
    
})

module.exports = mongoose.model('Post', postSchema)