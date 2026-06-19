const Service = require("../models/Service");

// GET
const getServices = async (req, res) => {

  try {

    const services = await Service.find();

    res.status(200).json(services);

  }

  catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// ADD
const createService = async (req, res) => {
  try {
    console.log("Incoming req.body:", req.body);
    console.log("Incoming req.file:", req.file);

    const { title, price, duration, description } = req.body;
    let image = "";

    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    } else {
      return res.status(400).json({ message: "Image is required by the server." });
    }

    if (!title || !price) {
      return res.status(400).json({ 
        message: `Missing required fields. Received Title: ${title}, Price: ${price}` 
      });
    }

    const service = await Service.create({
      title,
      price: price,
      duration: duration || "",
      description,
      image
    });

    res.status(201).json(service);

  } catch (error) {
    console.error("Mongoose validation error details:", error);
    res.status(500).json({
      message: error.message
    });
  }
};


// UPDATE
const updateService = async (req, res) => {
  try {
    const updateData = { ...req.body };
    
    // If a new image was uploaded, attach its path to the update payload
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const service = await Service.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// DELETE
const deleteService = async (req, res) => {

  try {

    await Service.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message: "Deleted"
    });

  }

  catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


module.exports = {

  getServices,
  createService,
  updateService,
  deleteService

};