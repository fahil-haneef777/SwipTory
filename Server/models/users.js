const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    bookmarks:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Slide"
    },
    posts:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Post"
    }
})

module.exports=mongoose.model('User',userSchema)