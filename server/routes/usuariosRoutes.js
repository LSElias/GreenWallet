const express = require("express");
const router = express.Router();

const usuarioController = require("../controllers/usuarioController");

router.get("/", usuarioController.get);

router.get("/getFreeAdmins", usuarioController.getFreeAdmins);
router.post("/login", usuarioController.login);
router.post("/registrar", usuarioController.create);
router.put("/:idUsuario", usuarioController.update);

router.get("/idU/:idUsuario", usuarioController.getByIdUser);
router.get("/idR/:idRol", usuarioController.getByIdRol);

module.exports = router;