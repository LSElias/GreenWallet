const { PrismaClient, Prisma } = require("@prisma/client");
const { info } = require("console");
const { parse } = require("path");
const prisma = new PrismaClient();

//Get
module.exports.get = async (request, response, next) => {
  const material = await prisma.material.findMany({
    orderBy: {
      idMaterial: "asc",
    }, include:{
        categoriaM: true
    }
  });
 
    const categValor=  material.map(m => ({
        idMaterial: m.idMaterial,
        nombre: m.nombre,
        categoria:  m.categoriaM.nombre,
        imagen: m.imagen,
        color: m.color
         
    }))
  response.json(categValor);
};

//GetByIdMaterial
module.exports.getByIdMat = async (request, response, next) => {
  let idMaterial = parseInt(request.params.idMaterial);
  const material = await prisma.material.findUnique({
    where: { idMaterial: idMaterial },
    include: {
      unidadMedida: true,
      categoriaM: true
    }
  })

  const valores= {
    categoria:  material.categoriaM.nombre,
    nombre: material.nombre,
    descripcion: material.descripcion,
    imagen: material.imagen,
    unidadMedida: material.unidadMedida.nombre,
    color: material.color,
    valorUnidad: material.valor
  };

  response.json(valores);
};

//FindMany
//GetByIdCategoria
module.exports.getByIdCat = async (request, response, next) => {
    let idCategoria = parseInt(request.params.idCategoria);
    const material = await prisma.material.findMany({
      where: { idCategoria: idCategoria },
      include: {
        unidadMedida: true,
        categoriaM: true
      }
    })
  
    const categValor=  material.map(m => ({
      categoria:  m.categoriaM.nombre,
        nombre: m.nombre,
        imagen: m.imagen,
        color: m.color,
        idMaterial: m.idMaterial  
    }))
  response.json(categValor);
};

//GetByIdCategoria
module.exports.getByIdUnidad = async (request, response, next) => {
    let idUnidad = parseInt(request.params.idUnidad);
    const material = await prisma.material.findMany({
      where: { idUnidad: idUnidad },
      include: {
        unidadMedida: true,
        categoriaM: true
      }
    })
  
    const categValor=  material.map(m => ({
        categoria:  m.categoriaM.nombre,
        nombre: m.nombre,
        imagen: m.imagen,
        color: m.color
         
    }))
  response.json(categValor);
};

//Create 
module.exports.create = async (request, response, next) => {
    let infoMat = request.body;
    const newMat = await prisma.material.create({
      data: {
        nombre: infoMat.nombre,
        descripcion: infoMat.descripcion,
        imagen: infoMat.imagen,
        idUnidad: infoMat.idUnidad,
        idCategoria:  infoMat.idCategoria,
        color: infoMat.color,
        valor: infoMat.valor
      },
    });
    response.json(newMat);
};

//Update
module.exports.update = async (request, response, next) => {
    let infoMat = request.body;
    let idMaterial = parseInt(request.params.idMaterial);

    const oldMat = await prisma.material.findUnique({
      where: { idMaterial: idMaterial },
      include: {
        unidadMedida: true,
        categoriaM: true
      },
    });
    const newMat = await prisma.material.update({
      where: {
        idMaterial: idMaterial,
      },
        data: {
            nombre: infoMat.nombre,
            descripcion: infoMat.descripcion,
            imagen: infoMat.imagen,
            idUnidad: infoMat.idUnidad,
            idCategoria:  infoMat.idCategoria,
            color: infoMat.color,
            valor: infoMat.valor
        }
    });
  
    response.json(newMat);
  };

