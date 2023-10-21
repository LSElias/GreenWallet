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
