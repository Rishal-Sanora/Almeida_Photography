const ContactMessage = require("../models/ContactMessage");
const sendEmail = require("../utils/sendEmail");
const createMessage = async (
  req,
  res
) => {

  try {

    const {
      name,
      email,
      subject,
      message
    } = req.body;

    const newMessage =
      await ContactMessage.create({
        name,
        email,
        subject,
        message
      });

    await sendEmail(
      subject,
      `
Name: ${name}

Email: ${email}

Message:

${message}
      `
    );

    res.status(201).json(
      newMessage
    );

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};
const getMessages = async (
  req,
  res
) => {

  try {

    const messages =
      await ContactMessage.find();

    res.status(200).json(
      messages
    );

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};
const deleteMessage = async (
  req,
  res
) => {

  try {

    await ContactMessage.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message:
        "Message deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};
module.exports = {
  createMessage,
  getMessages,
  deleteMessage
};