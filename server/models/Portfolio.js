const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema(
{
  category: {
    type: String,
    required: true
  },

  image: {
    type: String,
    required: true
  }

},
{
  timestamps: true
}
);

module.exports =
mongoose.model(
"Portfolio",
portfolioSchema
);