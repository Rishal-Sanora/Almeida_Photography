const Booking = require("../models/Booking");
const nodemailer = require("nodemailer");

const getBookings = async(req,res)=>{
  try{
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch(error){
    res.status(500).json({ message:error.message });
  }
};

const createBooking = async(req,res)=>{
  try{
    const booking = await Booking.create(req.body);

    // Send Emails via Nodemailer
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const mailOptionsUser = {
        from: process.env.EMAIL_USER,
        to: req.body.email,
        subject: 'Booking Confirmation - Almeida Photography',
        text: `Hello ${req.body.name},\n\nYour booking for ${req.body.service} on ${req.body.date} has been received. We will contact you shortly!\n\nEvent Details:\nLocation: ${req.body.location || 'N/A'}\nTime: ${req.body.time || 'N/A'}\nNotes: ${req.body.notes || 'None'}\n\nThank you,\nAlmeida Photography`
      };

      const mailOptionsAdmin = {
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: 'New Booking Received',
        text: `New Booking Details:\nName: ${req.body.name}\nEmail: ${req.body.email}\nPhone: ${req.body.phone}\nService: ${req.body.service}\nDate: ${req.body.date}\nTime: ${req.body.time || 'N/A'}\nLocation: ${req.body.location || 'N/A'}\nNotes: ${req.body.notes || 'None'}`
      };

      await transporter.sendMail(mailOptionsUser);
      await transporter.sendMail(mailOptionsAdmin);
    } catch (emailError) {
      console.error("Email sending failed (but booking succeeded):", emailError);
    }

    res.status(201).json(booking);
  } catch(error){
    res.status(500).json({ message:error.message });
  }
};

const updateBookingStatus = async(req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const booking = await Booking.findByIdAndUpdate(id, { status }, { new: true });

    if (status === "Confirmed") {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        });

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: booking.email,
          subject: 'Booking Confirmed! - Almeida Photography',
          text: `Hello ${booking.name},\n\nGreat news! Your booking for ${booking.service} on ${booking.date} has been officially confirmed by our team.\n\nWe look forward to capturing your special moments!\n\nBest,\nAlmeida Photography`
        };

        await transporter.sendMail(mailOptions);
      } catch (err) {
        console.error("Confirmation email failed:", err);
      }
    }

    res.status(200).json(booking);
  } catch(error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports={
  getBookings,
  createBooking,
  updateBookingStatus
};