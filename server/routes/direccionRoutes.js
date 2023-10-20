const express = require("express");
const router = express.Router();

const direccionController = require("../controllers/direccionController");

router.get("/", direccionController.get);

router.post("/", direccionController.create);
router.put("/:idDireccion", direccionController.update); 

router.get("/idDirec/:idDireccion", direccionController.getByIdDireccion);
router.get("/idUser/:idUsuario", direccionController.getByIdUsuario);

module.exports = router;