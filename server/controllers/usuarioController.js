const { PrismaClient, Prisma } = require("@prisma/client");
const { info } = require("console");
const { parse } = require("path");
const prisma = new PrismaClient();

//Get
module.exports.get = async (request, response, next) => {
  const usuarios = await prisma.usuario.findMany({
    orderBy: {
      idUsuario: "asc",
    },
  });
  response.json(usuarios);
};

//GetByIdUsuario
module.exports.getByIdUser = async (request, response, next) => {
  let idUsuario = parseInt(request.params.idUsuario);
  const usuario = await prisma.usuario.findUnique({
    where: { idUsuario: idUsuario },
    include: {
      rol: true,
    },
  });
  response.json(usuario);
};

//GetByIdRol
module.exports.getByIdRol = async (request, response, next) => {
  let idRol = parseInt(request.params.idRol);
  const usuario = await prisma.usuario.findMany({
    where: { idRol: idRol },
    include: {
      rol: true,
    },
  });
  response.json(usuario);
};

//login: Correo y Clave
module.exports.login = async (request, response, next) => {
  let { correo, contrasena } = request.body;
  const usuario = await prisma.usuario.findUnique({
    where: { correo: correo, contrasena: contrasena },
    include: {
      rol: true,
    },
  });
  response.json(usuario);
};

//Create 
module.exports.create = async (request, response, next) => {
  let infoUsuario = request.body;
  const newUsuario = await prisma.usuario.create({
    data: {
      idRol: infoUsuario.idRol,
      nombre: infoUsuario.nombre,
      apellido1: infoUsuario.apellido1,
      apellido2: infoUsuario.apellido2,
      correo: infoUsuario.correo,
      contrasena: infoUsuario.contrasena,
      cedula: infoUsuario.cedula,
      telefono: infoUsuario.telefono
    },
  });
  response.json(newUsuario);
};

//Update
module.exports.update = async (request, response, next) => {
  let infoUsuario = request.body;
  let idUsuario = parseInt(request.params.idUsuario);
  //Obtener videojuego viejo
  const oldUser = await prisma.usuario.findUnique({
    where: { idUsuario: idUsuario },
    include: {
     rol: true
    },
  });
  const newUser = await prisma.usuario.update({
    where: {
      idUsuario: idUsuario,
    },
      data: {
        idRol: infoUsuario.idRol,
        nombre: infoUsuario.nombre,
        apellido1: infoUsuario.apellido1,
        apellido2: infoUsuario.apellido2,
        correo: infoUsuario.correo,
        contrasena: infoUsuario.contrasena,
        cedula: infoUsuario.cedula,
        telefono: infoUsuario.telefono
      }
  });

  response.json(newUser);
};