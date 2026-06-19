const Notification = require("../models/Notification");
const getNotifications =
async (req,res)=>{

try{

const notifications =
await Notification.find({
user:req.user._id
})
.sort({
createdAt:-1
});

res.status(200).json(
notifications
);

}
catch(error){

res.status(500).json({
message:error.message
});

}

};
const markAsRead =
async(req,res)=>{

try{

const notification =
await Notification.findByIdAndUpdate(

req.params.id,

{
read:true
},

{
new:true
}

);

res.status(200).json(
notification
);

}
catch(error){

res.status(500).json({
message:error.message
});

}

};
const deleteNotification =
async(req,res)=>{

try{

await Notification.findByIdAndDelete(
req.params.id
);

res.status(200).json({

message:
"Notification deleted"

});

}
catch(error){

res.status(500).json({

message:error.message

});

}

};
module.exports={
getNotifications,
markAsRead,
deleteNotification
};