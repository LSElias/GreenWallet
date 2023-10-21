const express = require("express");
const router = express.Router();

const recompensaController = require("../controllers/recompensaControllers");

router.get("/", recompensaController.get);

router.post("/", recompensaController.create);
router.put("/:idRecompensas", recompensaController.update);

router.get("/:idRecompensas", recompensaController.getByIdRecom);
router.get("/idCat/:idCategoria", recompensaController.getByIdCategoria);


module.exports = router;