const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

//Get
module.exports.get = async (request, response, next) => {
  const horario = await prisma.horario.findMany({
    orderBy: {
      idHorario: 'asc',
    }
  });

  const datos = horario.map(b => ({
    dias: b.dias,
    horas: b.horas,
  }))

  response.json(datos);
};

//GetById
module.exports.getById = async (request, response, next) => {
    let idHorario = parseInt(request.params.idHorario);
    const horario = await prisma.horario.findUnique({
      where: { idHorario: idHorario }
    });
    const datos = {
        dias: horario.dias,
        horas: horario.horas,
      };
    response.json(datos);
};

//Crear
module.exports.create = async (request, response, next) => {
    let info = request.body;
    const newHorario = await prisma.horario.create({
      data: {
        dias: info.dias,
        horas: info.horas
      },
    });
    response.json(newHorario);
  };

  //Update
module.exports.update = async (request, response, next) => {
  let info = request.body;
  let idHorario = parseInt(request.params.idHorario);

  const old = await prisma.horario.findUnique({
    where: { idHorario: idHorario }
  });
  const newH = await prisma.horario.update({
    where: {
      idHorario: idHorario,
    },
    data: {
      dias: info.dias,
      horas: info.horas
    },
  });

  response.json(newH);
};