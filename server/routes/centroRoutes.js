const express = require("express");
const router = express.Router();

const  centroController = require("../controllers/centroController");

router.get("/", centroController.get);

router.post("/", centroController.create);
router.put("/:idCentro", centroController.update);

router.get("/:idCentro", centroController.getByIdCentro);
router.get("/admin/:idAdmin", centroController.getByIdUser);


module.exports = router;