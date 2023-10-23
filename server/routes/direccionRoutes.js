const express = require("express");
const router = express.Router();

const direccionController = require("../controllers/direccionController");

router.get("/", direccionController.get);

router.post("/", direccionController.create);
router.put("/:idDireccion", direccionController.update); 

router.get("/:idDireccion", direccionController.getByIdDireccion);

module.exports = router;