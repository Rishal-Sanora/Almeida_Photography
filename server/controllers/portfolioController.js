const Portfolio =
require("../models/Portfolio");


// GET ALL PHOTOS
const getPortfolio =
async(req,res)=>{

try{

const photos =
await Portfolio.find();

res.status(200).json(
photos
);

}

catch(error){

res.status(500).json({

message:
error.message

});

}

};


// DELETE PHOTO
const deletePortfolio =
async(req,res)=>{

try{

await Portfolio.findByIdAndDelete(
req.params.id
);

res.status(200).json({

message:
"Photo Deleted"

});

}

catch(error){

res.status(500).json({

message:
error.message

});

}

};

module.exports = {

getPortfolio,
deletePortfolio

};