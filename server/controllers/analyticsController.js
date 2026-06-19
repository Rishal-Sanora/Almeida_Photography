const User =
require("../models/User");

const Booking =
require("../models/Booking");

const Service =
require("../models/Service");

const Portfolio =
require("../models/Portfolio");

const ClientPhoto =
require("../models/ClientPhoto");
const getAnalytics =
async(req,res)=>{

try{

const totalUsers =
await User.countDocuments();

const totalBookings =
await Booking.countDocuments();

const totalServices =
await Service.countDocuments();

const totalPortfolio =
await Portfolio.countDocuments();

const pendingPhotos =
await ClientPhoto.countDocuments({
status:"Pending"
});

res.json({

totalUsers,
totalBookings,
totalServices,
totalPortfolio,
pendingPhotos

});

}
catch(error){

res.status(500).json({
message:error.message
});

}

};

module.exports={
getAnalytics
};
