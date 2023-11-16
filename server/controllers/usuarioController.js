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
    include:
    {
      rol: true,
      direccion: true
    }
  });

  const datos= usuarios.map(u => ({
    cedula: u.cedula,
    nombre: u.nombre + " " + u.apellido1 + " " + u.apellido2,
    correo: u.correo,
    telefono: u.telefono
  }))
  response.json(datos);
};

//GetByIdUsuario
module.exports.getByIdUser = async (request, response, next) => {
  let idUsuario = parseInt(request.params.idUsuario);
  const usuario = await prisma.usuario.findUnique({
    where: { idUsuario: idUsuario },
    include: {
      rol: true,
      direccion: true
    },
  });
  const datos= {
    idUsuario: usuario.idUsuario,
    cedula: usuario.cedula,
    nombre: usuario.nombre + " " + usuario.apellido1 + " " + usuario.apellido2,
    correo: usuario.correo,
    contrasena : usuario.contrasena,
    telefono: usuario.telefono,
    rol: usuario.rol.nombre,
    direccion: usuario.direccion.provincia 
    +", " + usuario.direccion.canton
    +", " + usuario.direccion.distrito
    +". " + usuario.direccion.senas
  }
  response.json(datos);
};

//GetByIdRol
module.exports.getByIdRol = async (request, response, next) => {
  let idRol = parseInt(request.params.idRol);
  const usuario = await prisma.usuario.findMany({
    where: { idRol: idRol },
    include: {
      rol: true,
      direccion: true
    },
  });
  const datos= usuario.map(u => ({
    cedula: u.cedula,
    nombre: u.nombre + u.apellido1,
    correo: u.correo,
    telefono: u.telefono
  }))
  response.json(datos);
};

module.exports.getFreeAdmins = async (request, response, next) => {
  const usuario = await prisma.usuario.findMany({
    where: { idRol: 2,
              centros:{ 
                none:{}
              } 
 },
    include: {
      rol: true,
      direccion: true
    },
  });
  const datos= usuario.map(u => ({
    idUsuario: u.idUsuario,
    nombre: u.nombre + " " + u.apellido1 + " " + u.apellido2,
  }))
  response.json(datos);
};



//login: Correo y Clave
module.exports.login = async (request, response, next) => {
  let { correo, contrasena } = request.body;
  const usuario = await prisma.usuario.findUnique({
    where: { correo: correo, contrasena: contrasena },
    include: {
      rol: true,
      direccion: true
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
      idDireccion: infoUsuario.idDireccion,
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

  const oldUser = await prisma.usuario.findUnique({
    where: { idUsuario: idUsuario }
  });
  const newUser = await prisma.usuario.update({
    where: {
      idUsuario: idUsuario,
    },
      data: {
        idRol: infoUsuario.idRol,
        idDireccion: infoUsuario.idDireccion,
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