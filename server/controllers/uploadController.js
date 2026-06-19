const Portfolio =
require("../models/Portfolio");

const uploadPortfolioImage =
async(req,res)=>{

try{

const category = req.body.category;
const files = req.files || [];

if (!files || files.length === 0) {
  return res.status(400).json({ message: "No images provided" });
}

const photoPromises = files.map(file => {
  return Portfolio.create({
    category: category,
    image: `/uploads/${file.filename}`
  });
});

const photos = await Promise.all(photoPromises);

res.status(201).json(
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

module.exports = {

uploadPortfolioImage

};