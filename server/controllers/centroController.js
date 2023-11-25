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
    idCentro: b.idCentro,
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
          idMaterial: true
        },
      },
    },
  });
  const datos = {
    nombre: centro.nombre,
    telefono: centro.telefono,
    horario: centro.horario.dias + " - " + centro.horario.horas,
    dias: centro.horario.dias,
    horas: centro.horario.horas,
    idHorario: centro.horario.idHorario,
    administrador: {
      idAdministrador: centro.administrador.idUsuario,
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
    provincia: centro.direccion.provincia,
    canton: centro.direccion.canton,
    senas: centro.direccion.senas,
    idDireccion: centro.direccion.idDireccion,
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
          idMaterial: true,
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



  const admin = await prisma.usuario.findUnique({
    where: { idUsuario: info.administrador }
  });


  const newHorario = await prisma.horario.create({
    data:{
      horas: info.horas,
      dias: info.dias
    }
  })

  const newDireccion = await prisma.direccion.create({
    data:{
      provincia: info.provinciaValue,
      canton: info.cantonValue,
      distrito: " ",
      senas: info.senas
    }
  })

  const newMateriales = await prisma.centro.create({
    data: {
      nombre: info.nombre,
      telefono: info.telefono,
      materiales: {
        connect: info.materiales,
      },
      administrador:{
        connect: admin
      },
      horario:{
        connect: newHorario
      },
      direccion:{
        connect: newDireccion
      }
    },
  });
  response.json(newMateriales);
};

//Actualizar
module.exports.update = async (request, response, next) => {
  let centro = request.body;
  let idCentro = parseInt(request.body.idCentro);

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


  const newDireccion = await prisma.direccion.update({
    where:{
      idDireccion: centro.idDireccion
    },
    data:{
      provincia: centro.provinciaValue,
      canton: centro.cantonValue,
      senas: centro.senas
    }
  })


  const newHorario = await prisma.horario.update({
    where:{
      idHorario: centro.idHorario
    },
    data:{
      dias: centro.dias,
      horas: centro.horas
    }
  })

  const newCentro = await prisma.centro.update({
    where: {
      idCentro: idCentro,
    },
    data: {
      idAdmin: centro.administrador,
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
