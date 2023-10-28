
const express = require("express");
const router = express.Router();

const datosController = require("../controllers/datosController");

router.get("/catmat", datosController.getCatMaterial);
router.get("/estado", datosController.getEstado);
router.get("/catrec", datosController.getCatRecomp);
router.get("/rol", datosController.getRol);
router.get("/unidadMed", datosController.getUnidadMed);


router.get("/catmat/:idCategoriaM", datosController.getByIdCatMat);
router.get("/estado/:idEstado", datosController.getByIdEstado);
router.get("/catrec/:idCategoria", datosController.getByIdCatRecomp);
router.get("/rol/:idRol", datosController.getByIdRol);
router.get("/unidadMed/:idUnidad", datosController.getByIdUnidadMed);

module.exports = router;