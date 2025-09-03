const express = require("express");
const { getTourMeta, getCarMeta } = require("../controllers/seoController");

const router = express.Router();

router.get("/tour/:id", getTourMeta);
router.get("/car/:id", getCarMeta);

module.exports = router;
