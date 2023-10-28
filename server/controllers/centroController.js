const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

//Get
module.exports.get = async (request, response, next) => {
  const centro = await prisma.centro.findMany({
    orderBy: {
      idCentro: "asc",
    },
    include: {
      administrador: true,
      direccion: true,
      horario: true,
    },
  });

  const datos = centro.map((b) => ({
    nombre: b.nombre,
    telefono: b.telefono,
    sede: b.direccion.provincia,
    administrador:
      b.administrador.nombre +
      " " +
      b.administrador.apellido1 +
      " " +
      b.administrador.apellido2,
  }));

  response.json(datos);
};

//GetByIdCentro
module.exports.getByIdCentro = async (request, response, next) => {
  let idCentro = parseInt(request.params.idCentro);
  const centro = await prisma.centro.findUnique({
    where: { idCentro: idCentro },
    include: {
      administrador: true,
      direccion: true,
      horario: true,
      materiales: {
        select: {
          nombre: true,
          descripcion: true,
          imagen: true,
          color: true,
          valor: true,
        },
      },
    },
  });
  const datos = {
    nombre: centro.nombre,
    telefono: centro.telefono,
    horario: centro.horario.dias + " - " + centro.horario.horas,
    administrador: {
      nombre:
        centro.administrador.nombre +
        " " +
        centro.administrador.apellido1 +
        " " +
        centro.administrador.apellido2,
      correo: centro.administrador.correo,
      cedula: centro.administrador.cedula,
    },
    direccion:
      centro.direccion.provincia +
      ", " +
      centro.direccion.canton +
      ", " +
      centro.direccion.distrito +
      ". " +
      centro.direccion.senas,
    materiales: centro.materiales,
  };
  response.json(datos);
};

//GetByIdUsuario
module.exports.getByIdUser = async (request, response, next) => {
  let idAdmin = parseInt(request.params.idAdmin);
  const centro = await prisma.centro.findMany({
    where: { idAdmin: idAdmin },
    include: {
      administrador: true,
      direccion: true,
      horario: true,
      materiales: {
        select: {
          nombre: true,
          descripcion: true,
          imagen: true,
          color: true,
          valor: true,
        },
      },
    },
  });
  const datos = centro.map((centro) => ({
    nombre: centro.nombre,
    telefono: centro.telefono,
    horario: centro.horario.dias + " - " + centro.horario.horas,
    administrador: {
      nombre:
        centro.administrador.nombre +
        " " +
        centro.administrador.apellido1 +
        " " +
        centro.administrador.apellido2,
      correo: centro.administrador.correo,
      cedula: centro.administrador.cedula,
    },
    direccion:
      centro.direccion.provincia +
      ", " +
      centro.direccion.canton +
      ", " +
      centro.direccion.distrito +
      ". " +
      centro.direccion.senas,
    materiales: centro.materiales,
  }));
  response.json(datos);
};

//Crear
module.exports.create = async (request, response, next) => {
  let info = request.body;
  const newMateriales = await prisma.centro.create({
    data: {
      idAdmin: info.idAdmin,
      idDireccion: info.idDireccion,
      idHorario: info.idHorario,
      nombre: info.nombre,
      telefono: info.telefono,
      materiales: {
        connect: info.materiales,
      },
    },
  });
  response.json(newMateriales);
};

//Actualizar
module.exports.update = async (request, response, next) => {
  let centro = request.body;
  let idCentro = parseInt(request.params.idCentro);

  const oldCentro = await prisma.centro.findUnique({
    where: { idCentro: idCentro },
    include: {
      materiales: {
        select: {
          idMaterial: true
        },
      },
      administrador: true,
      direccion: true,
      horario: true,
    },
  });
  const newCentro = await prisma.centro.update({
    where: {
      idCentro: idCentro,
    },
    data: {
      idAdmin: centro.idAdmin,
      idDireccion: centro.idDireccion,
      idHorario: centro.idHorario,
      nombre: centro.nombre,
      telefono: centro.telefono,
      materiales: {
        disconnect: oldCentro.materiales,
        connect: centro.materiales,
      },
    },
  });
  response.json(newCentro);
};
