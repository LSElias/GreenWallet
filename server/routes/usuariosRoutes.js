const express = require("express");
const router = express.Router();

const usuarioController = require("../controllers/usuarioController");

router.get("/", usuarioController.get);

router.post("/login", usuarioController.login);
router.post("/", usuarioController.create);
router.put("/:idUsuario", usuarioController.update);

router.get("/idU/:idUsuario", usuarioController.getByIdUser);
router.get("/idR/:idRol", usuarioController.getByIdRol);

module.exports = router;