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
  const datos= recompensa.map(u => ({
    categoria: u.categoria.nombre,
    nombre: u.nombre,
    valorUnidad: u.valor,
    cantidadDispo: u.cantidad
  }))
  response.json(datos);
};

//GetByIdRecompensa
module.exports.getByIdRecom = async (request, response, next) => {
  let idRecompensas = parseInt(request.params.idRecompensas);
  const recompensa = await prisma.recompensa.findUnique({
    where: { idRecompensas: idRecompensas },
    include: {
      categoria: true,
    },
  });
  const datos= {
    categoria: recompensa.categoria.nombre,
    nombre: recompensa.nombre,
    descripcion: recompensa.descripcion,
    foto: recompensa.foto,
    valorUnidad: recompensa.valor,
    cantidadDispo: recompensa.cantidad,
    estado: recompensa.estado, 
    fechaAdquision: recompensa.fechaAdquision.toLocaleDateString(),
    fechaExpiracion: recompensa.fechaExpiracion.toLocaleDateString(),
  }
  response.json(datos);
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
  const datos= recompensa.map(u => ({
    categoria: u.categoria.nombre,
    nombre: u.nombre,
    valorUnidad: u.valor,
    cantidadDispo: u.cantidad
  }))
  response.json(datos);
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
      fechaAdquision: new Date(infoRecom.fechaAdquision),
      fechaExpiracion: new Date(infoRecom.fechaExpiracion)
    },
  });
  response.json(newRecom);
};

//Update
module.exports.update = async (request, response, next) => {
  let infoRecom = request.body;
  let idRecompensas = parseInt(request.params.idRecompensas);

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
      fechaAdquision: new Date(infoRecom.fechaAdquision),
      fechaExpiracion: new Date(infoRecom.fechaExpiracion)
    },
  });

  response.json(newRecom);
};