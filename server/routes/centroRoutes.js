const express = require("express");
const router = express.Router();

const  centroController = require("../controllers/centroController");

router.get("/", centroController.get);
router.post("/", centroController.create);
router.put("/:idCentro", centroController.update);

//Reporte 1 
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

//Reporte 2 
router.get("/info/:idAdmin", centroController.getCentroByIAdmin);
//1 valor
router.get("/canjes/:idAdmin", centroController.getCanjesByIAdmin);
router.get("/ecomoneda/:idAdmin", centroController.getEcoByIAdmin);


router.get("/material/:idAdmin", centroController.getCanMatByIAdmin);


module.exports = router;