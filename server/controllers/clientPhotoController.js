const ClientPhoto = require("../models/ClientPhoto");

const uploadClientPhotos = async (req, res, next) => {
  try {
    const images = req.files ? req.files.map(file => `https://almeida-photography-1.onrender.com/uploads/${file.filename}`) : [];
    
    const clientPhotoData = {
      name: req.user.name,
      email: req.user.email,
      eventName: req.body.eventName,
      images: images
    };

    const newPhoto = await ClientPhoto.create(clientPhotoData);
    res.status(201).json(newPhoto);
  } catch (error) {
    next(error);
  }
};

const getClientPhotos = async (req, res, next) => {
  try {
    const photos = await ClientPhoto.find();
    res.status(200).json(photos);
  } catch (error) {
    next(error);
  }
};

const approvePhoto = async (req, res, next) => {
  try {
    const photo = await ClientPhoto.findByIdAndUpdate(
      req.params.id,
      { status: "Approved" },
      { new: true }
    );
    res.status(200).json(photo);
  } catch (error) {
    next(error);
  }
};

const rejectPhoto = async (req, res, next) => {
  try {
    const photo = await ClientPhoto.findByIdAndUpdate(
      req.params.id,
      { status: "Rejected" },
      { new: true }
    );
    res.status(200).json(photo);
  } catch (error) {
    next(error);
  }
};

const deletePhoto = async (req, res, next) => {
  try {
    await ClientPhoto.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadClientPhotos,
  getClientPhotos,
  approvePhoto,
  rejectPhoto,
  deletePhoto,
};