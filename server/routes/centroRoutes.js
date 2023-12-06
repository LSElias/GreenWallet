const express = require("express");
const router = express.Router();

const  centroController = require("../controllers/centroController");

router.get("/", centroController.get);
router.post("/", centroController.create);
router.put("/:idCentro", centroController.update);

//1 valor
router.get("/canjes",centroController.getCanjes);
router.get("/ecomonedas",centroController.getEcomonedas);
router.get("/totalEco",centroController.getTotalEcom);
//1 valor c/u
router.get("/cupones",centroController.getCupones);
router.get("/totalCupon",centroController.getCuponesEco);


router.get("/:idCentro", centroController.getByIdCentro);
router.get("/admin/:idAdmin", centroController.getByIdUser);

router.get("/changeEstado/:idCentro", centroController.changeEstado);



module.exports = router;