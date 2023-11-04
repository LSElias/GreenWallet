const express = require("express");
const router = express.Router();

const materialController = require("../controllers/materialController");

router.get("/", materialController.get);

router.post("/", materialController.upload);

router.put("/:idMaterial", materialController.update);

router.get("/:idMaterial", materialController.getByIdMat);
router.get("/cat/:idCategoria", materialController.getByIdCat);
router.get("/unidad/:idUnidad", materialController.getByIdUnidad);


module.exports = router;