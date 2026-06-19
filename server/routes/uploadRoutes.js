const express =
require("express");

const router =
express.Router();

const upload =
require("../config/multer");

const {

uploadPortfolioImage

}
=
require(
"../controllers/uploadController"
);

router.post(

"/portfolio",

upload.array(
"images",
20
),

uploadPortfolioImage

);

module.exports =
router;