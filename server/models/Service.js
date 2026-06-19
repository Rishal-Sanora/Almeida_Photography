const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
{
  title:{
    type:String,
    required:true
  },

  price:{
    type:String,
    required:true
  },

  duration:{
    type:String
  },

  description:{
    type:String
  },

  image:{
    type:String,
    required:true
  }

},
{
  timestamps:true
}
);

module.exports =
mongoose.model(
"Service",
serviceSchema
);