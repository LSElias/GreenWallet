const express = require("express");
const router = express.Router();

const cuponController = require("../controllers/cuponController");

router.get("/", cuponController.get);



module.exports = router;