const { PrismaClient, Prisma } = require("@prisma/client");
const { info } = require("console");
const { parse } = require("path");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//Get
module.exports.get = async (request, response, next) => {
  const usuarios = await prisma.usuario.findMany({
    orderBy: {
      idUsuario: "asc",
    },
    include: {
      rol: true,
      direccion: true,
    },
  });

  const datos = usuarios.map((u) => ({
    idUsuario: u.idUsuario,
    cedula: u.cedula,
    nombre: u.nombre + " " + u.apellido1 + " " + u.apellido2,
    correo: u.correo,
    telefono: u.telefono,
  }));
  response.json(datos);
};

//GetByIdUsuario
module.exports.getByIdUser = async (request, response, next) => {
  let idUsuario = parseInt(request.params.idUsuario);
  const usuario = await prisma.usuario.findUnique({
    where: { idUsuario: idUsuario },
    include: {
      rol: true,
      direccion: true,
    },
  });
  const datos = {
    idUsuario: usuario.idUsuario,
    cedula: usuario.cedula,
    nombre: usuario.nombre + " " + usuario.apellido1 + " " + usuario.apellido2,
    correo: usuario.correo,
    contrasena: usuario.contrasena,
    telefono: usuario.telefono,
    rol: usuario.rol.nombre,
    direccion:
      usuario.direccion.provincia +
      ", " +
      usuario.direccion.canton +
      ", " +
      usuario.direccion.distrito +
      ". " +
      usuario.direccion.senas,
  };
  response.json(datos);
};

//GetByIdRol
module.exports.getByIdRol = async (request, response, next) => {
  let idRol = parseInt(request.params.idRol);
  const usuario = await prisma.usuario.findMany({
    where: { idRol: idRol },
    include: {
      rol: true,
      direccion: true,
    },
  });
  const datos = usuario.map((u) => ({
    idUsuario: u.idUsuario,
    cedula: u.cedula,
    nombre: u.nombre + " " + u.apellido1 + " " + u.apellido2,
    correo: u.correo,
    telefono: u.telefono,
  }));
  response.json(datos);
};

module.exports.getFreeAdmins = async (request, response, next) => {
  const usuario = await prisma.usuario.findMany({
    where: {
      idRol: 2,
      centros: {
        none: {},
      },
    },
    include: {
      rol: true,
      direccion: true,
    },
  });
  const datos = usuario.map((u) => ({
    idUsuario: u.idUsuario,
    nombre: u.nombre + " " + u.apellido1 + " " + u.apellido2,
  }));
  response.json(datos);
};

//login: Correo y Clave
module.exports.login = async (request, response, next) => {
  let userData = request.body;

  const usuario = await prisma.usuario.findUnique({
    where: {
      correo: userData.correo,
    },
  });

  if (!usuario) {
    response.status(401).send({
      success: false,
      message: "Datos erróneos",
    });
  }

  const checkPassword = await bcrypt.compare(userData.contrasena, usuario.contrasena);
  if (checkPassword === false) {
    response.status(401).send({
      success: false,
      message: "Credenciales no validas"
    })
  } else {
    const payload = {
      idUsuario: usuario.idUsuario,
      correo: usuario.correo,
      rol: usuario.rol,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE
    });
    response.json({
      success: true,
      message: "Bienvenido a GreenWallet",
      token,
    })
  }
};

//Create
module.exports.create = async (request, response, next) => {
  const infoUsuario = request.body;

  let salt = bcrypt.genSaltSync(10);

  let hash = bcrypt.hashSync(infoUsuario.contrasena, salt);

  const newDireccion = await prisma.direccion.create({
    data:{
      provincia: infoUsuario.provinciaValue,
      canton: infoUsuario.cantonValue,
      distrito: " ",
      senas: infoUsuario.senas
    }
  })



  const newUsuario = await prisma.usuario.create({
    data: {
      nombre: infoUsuario.nombre,
      apellido1: infoUsuario.apellido1,
      apellido2: infoUsuario.apellido2,
      correo: infoUsuario.correo,
      contrasena: hash,
      cedula: infoUsuario.cedula,
      telefono: infoUsuario.telefono,
      rol: {
        connect: infoUsuario.rol
      },  
      direccion:{
        connect: newDireccion
      }, 
    },
  });
  response.status(200).json({
    status: true,
    message: "Creado exitosamente",
    data: newUsuario,
  });
};

//Update
module.exports.update = async (request, response, next) => {
  let infoUsuario = request.body;
  let idUsuario = parseInt(request.params.idUsuario);

  const oldUser = await prisma.usuario.findUnique({
    where: { idUsuario: idUsuario },
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
      telefono: infoUsuario.telefono,
    },
  });

  response.json(newUser);
};
