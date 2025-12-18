import mongoose from "mongoose";
const tagsSchema =new mongoose.Schema({
    name:{
        type: String,
        rerquired: true
    },
    description:{
        type:String,
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }
})

const Tags = mongoose.model('Tags', tagsSchema)

export  default Tags;