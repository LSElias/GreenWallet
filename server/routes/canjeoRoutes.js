const express = require("express");
const router = express.Router();

const canjeoController = require("../controllers/canjeoController");

router.get("/", canjeoController.get);
router.get("/:idCanjeo", canjeoController.getByIdCanjeo);

router.post("/", canjeoController.create);

router.get("/cliente/:idUsuario", canjeoController.getByIdCliente);
router.get("/admin/:idAdmin", canjeoController.getByIdAdmin);



module.exports = router;