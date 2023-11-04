const { PrismaClient, Prisma } = require("@prisma/client");
const { info } = require("console");
const { parse } = require("path");
const prisma = new PrismaClient();
const multer = require("multer");
const fs = require('fs');

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


//Investigación proceso...
//Ruta del almacenamiento
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "prisma/imagenes/");
  },
  filename: function (req, file, cb) {
   //console.log(file)
    cb(null,`${file.originalname}`);
  }
});

const upload = multer({storage: storage}); 

exports.upload = upload.single('imagen'); 


//Create 
module.exports.create = async (request, response, next) => {
  let infoMat = request.body;
  const photo = request.file.originalname;
  const newMat = await prisma.material.create({
    data: { 
      nombre: infoMat.nombre,
      descripcion: infoMat.descripcion,
      imagen: photo,
      idUnidad:parseInt( infoMat.idUnidad),
      idCategoria: parseInt(infoMat.idCategoria),
      color: infoMat.color,
      valor: parseInt(infoMat.valor)
    },
  });

  response.json(newMat);
};
const uploadOld = "prisma/imagenes/"; 

//Update
module.exports.update = async (request, response, next) => {
    let infoMat = request.body;
    let idMaterial = parseInt(request.params.idMaterial);
    const photo = request.file.originalname;
    const oldMat = await prisma.material.findUnique({
      where: { idMaterial: idMaterial },
      include: {
        unidadMedida: true,
        categoriaM: true
      },
    });
    const oldPhoto= uploadOld + oldMat.imagen; 
    
    if(fs.existsSync(oldPhoto)){
      fs.unlinkSync(oldPhoto)
    }

    const newMat = await prisma.material.update({
      where: {
        idMaterial: idMaterial,
      },
        data: {
            nombre: infoMat.nombre,
            descripcion: infoMat.descripcion,
            imagen: photo,
            idUnidad: parseInt(infoMat.idUnidad),
            idCategoria:  parseInt(infoMat.idCategoria),
            color: infoMat.color,
            valor: parseInt(infoMat.valor)
        }
    });
  
    response.json(newMat);
  };

