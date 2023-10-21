const { PrismaClient, Prisma } = require("@prisma/client");
const { info } = require("console");
const { parse } = require("path");
const prisma = new PrismaClient();

//Get
module.exports.get = async (request, response, next) => {
  const recompensa = await prisma.recompensa.findMany({
    orderBy: {
      idRecompensas: "asc",
    },
    include:{
        categoria: true
    }
  });
  response.json(recompensa);
};

//GetByIdRecompensa
module.exports.getByIdRecom = async (request, response, next) => {
  let idRecompensas = parseInt(request.params.idRecompensas);
  const recompensa = await prisma.recompensa.findMany({
    where: { idRecompensas: idRecompensas },
    include: {
      categoria: true,
    },
  });
  response.json(recompensa);
};

//GetByIdRecompensa
module.exports.getByIdCategoria = async (request, response, next) => {
  let idCategoria = parseInt(request.params.idCategoria);
  const recompensa = await prisma.recompensa.findMany({
    where: { idCategoria: idCategoria },
    include: {
      categoria: true,
    },
  });
  response.json(recompensa);
};

//Create 
module.exports.create = async (request, response, next) => {
  let infoRecom = request.body;
  const newRecom = await prisma.recompensa.create({
    data: {
      idCategoria: infoRecom.idCategoria,
      nombre: infoRecom.nombre,
      descripcion: infoRecom.descripcion,
      foto: infoRecom.foto,
      valor: infoRecom.valor,
      cantidad: infoRecom.cantidad,
      estado: infoRecom.estado,
      fechaAdquision: infoRecom.fechaAdquision,
      fechaExpiracion: infoRecom.fechaExpiracion
    },
  });
  response.json(newRecom);
};

//Update
module.exports.update = async (request, response, next) => {
  let infoRecom = request.body;
  let idRecompensas = parseInt(request.params.idRecompensas);
  //Obtener videojuego viejo
  const oldRecom = await prisma.recompensa.findUnique({
    where: { idRecompensas: idRecompensas },
    include: {
     categoria: true
    },
  });
  const newRecom = await prisma.recompensa.update({
    where: {
      idRecompensas: idRecompensas,
    },
    data: {
      idCategoria: infoRecom.idCategoria,
      nombre: infoRecom.nombre,
      descripcion: infoRecom.descripcion,
      foto: infoRecom.foto,
      valor: infoRecom.valor,
      cantidad: infoRecom.cantidad,
      estado: infoRecom.estado,
      fechaAdquision: infoRecom.fechaAdquision,
      fechaExpiracion: infoRecom.fechaExpiracion
    }
  });

  response.json(newRecom);
};