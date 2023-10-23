const express = require("express");
const router = express.Router();

const  billeteraController = require("../controllers/billeteraController");

router.get("/", billeteraController.get);

router.get("/:idUsuario", billeteraController.getByIdUser);


module.exports = router;