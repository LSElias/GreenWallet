const { PrismaClient, Prisma } = require("@prisma/client");
const { info } = require("console");
const { parse } = require("path");
const prisma = new PrismaClient();

//Get
module.exports.get = async (request, response, next) => {
  const billetera = await prisma.billetera.findMany({
    orderBy: {
      idBilletera: "asc",
    },
    include: {
      usuario: true,
    },
  });
  const datosperso = billetera.map((b) => ({
    usuario:
      b.usuario.nombre + " " + b.usuario.apellido1 + " " + b.usuario.apellido2,
    disponibles: b.disponibles,
    canjeados: b.canjeadas,
    total: b.total,
  }));

  response.json(datosperso);
};

//GetByIdUsuario
module.exports.getByIdUser = async (request, response, next) => {
  let idUsuario = parseInt(request.params.idUsuario);
  const billetera = await prisma.billetera.findUnique({
    where: { idUsuario: idUsuario },
    include: {
      usuario: true,
    },
  });

  const datospers = {
    usuario: {
      cedula: billetera.usuario.cedula,
      telefono: billetera.usuario.telefono,
      correo: billetera.usuario.correo,
      nombre: 
      billetera.usuario.nombre + " " + billetera.usuario.apellido1 + " " + billetera.usuario.apellido2,
    },
    disponibles: billetera.disponibles,
    canjeados: billetera.canjeadas,
    total: billetera.total,
  };

  response.json(datospers);
};

//Create 
module.exports.create = async (request, response, next) => {
    let infoB = request.body;
    const newBill = await prisma.billetera.create({
      data: {
        idUsuario: infoB.idUsuario,
        disponibles: infoB.disponibles,
        canjeadas: infoB.canjeadas,
        total: infoB.total
      }
    });
    response.json(newBill);
  };
  
//Update
module.exports.update = async (request, response, next) => {
  let infoB = request.body;
  let idBilletera = parseInt(request.params.idBilletera);

  const old = await prisma.billetera.findUnique({
    where: { idBilletera: idBilletera }
  });
  const newBill = await prisma.billetera.update({
    where: {
      idBilletera: idBilletera,
    },
    data: {
      idUsuario: infoB.idUsuario,
      disponibles: infoB.disponibles,
      canjeadas: infoB.canjeadas,
      total: infoB.total
    }
  });

  response.json(newBill);
};