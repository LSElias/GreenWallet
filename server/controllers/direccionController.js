const { PrismaClient, Prisma } = require("@prisma/client");
const { info } = require("console");
const { parse } = require("path");
const prisma = new PrismaClient();

//Get
module.exports.get = async (request, response, next) => {
  const direccion = await prisma.direccion.findMany({
    orderBy: {
      idDireccion: "asc",
    }
  });
  response.json(direccion);
};

//GetByIdDirec
module.exports.getByIdDireccion = async (request, response, next) => {
  let idDireccion = parseInt(request.params.idDireccion);
  const direccion = await prisma.direccion.findUnique({
    where: { idDireccion: idDireccion }
  });
  response.json(direccion);
};

//Create 
module.exports.create = async (request, response, next) => {
  let infoDirec = request.body;
  const newDirec = await prisma.direccion.create({
    data: {
      provincia: infoDirec.provincia,
      canton: infoDirec.canton,
      distrito: infoDirec.distrito,
      senas: infoDirec.senas
    }
  });
  response.json(newDirec);
};

//Update
module.exports.update = async (request, response, next) => {
  let infoDirec = request.body;
  let idDireccion = parseInt(request.params.idDireccion);
  //Obtener videojuego viejo
  const oldDirec = await prisma.direccion.findUnique({
    where: { idDireccion: idDireccion }
  });
  const newDirec = await prisma.direccion.update({
    where: {
      idDireccion: idDireccion,
    },
      data: {
        provincia: infoDirec.provincia,
        canton: infoDirec.canton,
        distrito: infoDirec.distrito,
        senas: infoDirec.senas
      }
  });

  response.json(newDirec);
};
