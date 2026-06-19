const express =
require("express");

const router =
express.Router();

const {

getPortfolio,
deletePortfolio

}
=
require(
"../controllers/portfolioController"
);

router.get(
"/",
getPortfolio
);

router.delete(
"/:id",
deletePortfolio
);

module.exports =
router;