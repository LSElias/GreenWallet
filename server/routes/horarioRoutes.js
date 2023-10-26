const express = require("express");
const router = express.Router();

const  horarioCostroller = require("../controllers/horarioCostroller");

router.get("/", horarioCostroller.get);

router.post("/", horarioCostroller.create);

router.get("/:idHorario", horarioCostroller.getById);

module.exports = router;