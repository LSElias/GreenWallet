const express = require("express");
const router = express.Router();

const  billeteraController = require("../controllers/billeteraController");

router.get("/", billeteraController.get);

router.post("/", billeteraController.create);
router.put("/:idBilletera", billeteraController.update);

router.get("/:idUsuario", billeteraController.getByIdUser);


module.exports = router;