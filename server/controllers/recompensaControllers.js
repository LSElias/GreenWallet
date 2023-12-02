const { PrismaClient, Prisma } = require("@prisma/client");
const { info } = require("console");
const { parse } = require("path");
const prisma = new PrismaClient();
const multer = require("multer");
const fs = require("fs");

//Get
module.exports.getAll = async (request, response, next) => {
  const recompensa = await prisma.recompensa.findMany({
    orderBy: {
      idRecompensas: "asc",
    },

    include:{
        categoria: true
    }
  });
  const datos= recompensa.map(u => ({
    idRecompensas: u.idRecompensas,
    idCategoria: u.idCategoria,
    categoria: u.categoria.nombre,
    nombre: u.nombre,
    valorUnidad: u.valor,
    cantidadDispo: u.cantidad,
    fechaAdquision: u.fechaAdquision,
    fechaExpiracion: u.fechaExpiracion
  }))
  response.json(datos);
};

//Get
module.exports.get = async (request, response, next) => {
  const recompensa = await prisma.recompensa.findMany({
    orderBy: {
      idRecompensas: "asc",
    },
    where: {
      fechaExpiracion: {
        gt: new Date(),
      },
      cantidad:{
        gt: 0,
      }
    },

    include:{
        categoria: true
    }
  });
  const datos= recompensa.map(u => ({
    idRecompensas: u.idRecompensas,
    idCategoria: u.idCategoria,
    categoria: u.categoria.nombre,
    nombre: u.nombre,
    valorUnidad: u.valor,
    cantidadDispo: u.cantidad,
    fechaAdquision: u.fechaAdquision,
    fechaExpiracion: u.fechaExpiracion,
    imagen: u.foto
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

//Ruta del almacenamiento
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "prisma/imagenes/");
  },
  filename: function (req, file, cb) {
    //console.log(file)
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

exports.upload = upload.single("foto");


//Create 
module.exports.create = async (request, response, next) => {
  let infoRecom = request.body;
  const photo = request.file.originalname;

  const newRecom = await prisma.recompensa.create({
    data: {
      idCategoria: parseInt(infoRecom.idCategoria),
      nombre: infoRecom.nombre,
      descripcion: infoRecom.descripcion,
      foto: photo,
      valor: parseInt(infoRecom.valor),
      cantidad: parseInt(infoRecom.cantidad),
      estado: Boolean(infoRecom.estado),
      fechaAdquision: new Date(infoRecom.fechaAdquision),
      fechaExpiracion:  new Date(infoRecom.fechaExpiracion),
    }
  });
  response.json(newRecom);
};

const uploadOld = "prisma/imagenes/";

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

  const oldPhoto = uploadOld + oldRecom.foto;
  if (request.file != undefined) {
    var photo = request.file.originalname;
  }
  if (photo != null) {
    if (fs.existsSync(oldPhoto)) {
      fs.unlinkSync(oldPhoto);
    }
  } else {
    photo = oldRecom.foto;
  }

  const newRecom = await prisma.recompensa.update({
    where: {
      idRecompensas: idRecompensas,
    },
    data: {
      idCategoria: parseInt(infoRecom.idCategoria),
      nombre: infoRecom.nombre,
      descripcion: infoRecom.descripcion,
      foto: photo,
      valor: parseInt(infoRecom.valor),
      cantidad: parseInt(infoRecom.cantidad),
      estado: Boolean(infoRecom.estado),
      fechaAdquision: new Date(infoRecom.fechaAdquision),
      fechaExpiracion:  new Date(infoRecom.fechaExpiracion),
    },
  });

  response.json(newRecom);
};