const { PrismaClient, Prisma } = require("@prisma/client");
const { info } = require("console");
const { parse } = require("path");
const prisma = new PrismaClient();

//Get
module.exports.get = async (request, response, next) => {
  const cupon = await prisma.cupon.findMany({
    orderBy: {
      idCupon: "asc",
    },
    include:
    {
        usuario: true,
        recompensa: true,
        estado: true
    }
  });

  response.json(cupon);
};

//GetById
module.exports.getByIdCupon = async (request, response, next) => {
  let idCupon = parseInt(request.params.idCupon);
  const cupon = await prisma.cupon.findMany({
    where: { idCupon: idCupon },
    include:
    {
        usuario: true,
        recompensa: true,
        estado: true
    }
  });
  response.json(cupon);
};

//GetByIdUsuario
module.exports.getByIdUsuario = async (request, response, next) => {
  let idUsuario = parseInt(request.params.idUsuario);
  const cupon = await prisma.cupon.findMany({
    where: { idUsuario: idUsuario },
    include:
    {
        usuario: true,
        recompensa: true,
        estado: true
    }
  });
  response.json(cupon);
};

//GetByIdRecomp
module.exports.getByIdRecomp = async (request, response, next) => {
  let idRecompensa = parseInt(request.params.idRecompensa);
  const cupon = await prisma.cupon.findMany({
    where: { idRecompensa: idRecompensa },
    include:
    {
        usuario: true,
        recompensa: true,
        estado: true
    }
  });
  response.json(cupon);
};

//Create 
module.exports.create = async (request, response, next) => {
  let infoCupon = request.body;
  const newCupon = await prisma.cupon.create({
    data: {
      idUsuario: infoCupon.idUsuario,
      idRecompensa: infoCupon.idRecompensa,
      idEstado: infoCupon.idEstado
    }
  });
  response.json(newCupon);
};

//Update
module.exports.update = async (request, response, next) => {
  let infoCupon = request.body;
  let idCupon = parseInt(request.params.idCupon);
  //Obtener videojuego viejo
  const oldCupon = await prisma.cupon.findUnique({
    where: { idCupon: idCupon },
    include:
    {
        usuario: true,
        recompensa: true,
        estado: true
    }
  });
  const newCupon = await prisma.cupon.update({
    where: {
      idCupon: idCupon,
    },
    data: {
      idUsuario: infoCupon.idUsuario,
      idRecompensa: infoCupon.idRecompensa,
      idEstado: infoCupon.idEstado
    },
    include:
    {
        usuario: true,
        recompensa: true,
        estado: true
    }

  });

  response.json(newCupon);
};