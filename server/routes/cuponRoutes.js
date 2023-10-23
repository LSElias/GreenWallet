const express = require("express");
const router = express.Router();

const cuponController = require("../controllers/cuponController");

router.get("/", cuponController.get);

router.post("/", cuponController.create);
router.put("/:idCupon", cuponController.update);

router.get("/:idCupon", cuponController.getByIdCupon);
router.get("/idUser/:idUsuario", cuponController.getByIdUsuario);
router.get("/idRecom/:idRecompensa", cuponController.getByIdRecomp);

module.exports = router;