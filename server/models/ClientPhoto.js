const mongoose = require("mongoose");

const clientPhotoSchema = new mongoose.Schema(
{
    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    eventName:{
        type:String
    },

    category:{
        type:String
    },

    description:{
        type:String
    },

    images:[
        {
            type:String
        }
    ],

    status:{
        type:String,
        enum:["Pending","Approved","Rejected"],
        default:"Pending"
    }
},
{
    timestamps:true
}
);

module.exports = mongoose.model("ClientPhoto",clientPhotoSchema);