const { PrismaClient, Prisma } = require("@prisma/client");
const { info } = require("console");
const { parse } = require("path");
const prisma = new PrismaClient();

//Get
module.exports.get = async (request, response, next) => {
  const canjeo = await prisma.canjeo.findMany({
    orderBy: {
      idCanjeo: "asc",
    },
    include: {
      usuario: true,
      centro: true,
    },
  });

  const datos = canjeo.map((c) => ({
    fecha: c.fecha.toLocaleDateString(),
    centro: c.centro.nombre,
    usuario:
      c.usuario.nombre + " " + c.usuario.apellido1 + " " + c.usuario.apellido2,
    total: c.total,
  }));

  response.json(datos);
};


//GetByIdCanjeo
module.exports.getByIdCanjeo = async (request, response, next) => {
  let idCanjeo = parseInt(request.params.idCanjeo);
  const canjeo = await prisma.canjeo.findUnique({
    where: { idCanjeo: idCanjeo },
    include: {
      usuario: true,
      centro: {
        select: {
          direccion: true,
          nombre: true,
          telefono: true,
          horario:true,
          administrador:true
          
        },
      },
      canjeoDet: {
        select: {
          material: {
            select: {
              nombre: true,
              valor: true,
            },
          },
          cantidad: true,
          subtotal: true,
        },
      },
    },
  });
  const datos = {

    fecha: canjeo.fecha.toLocaleDateString(),

    //Centro
    centro: canjeo.centro.nombre,
    administrador: canjeo.centro.administrador.nombre 
           + " " + canjeo.centro.administrador.apellido1
           + " " + canjeo.centro.administrador.apellido2,
    horario: canjeo.centro.horario.dias + " - " + canjeo.centro.horario.horas,
    direccion:
      canjeo.centro.direccion.provincia +
      ", " +
      canjeo.centro.direccion.canton +
      ", " +
      canjeo.centro.direccion.distrito +
      ". " +
      canjeo.centro.direccion.senas,
    telefonoCentro: canjeo.centro.telefono,

    //Usuario
    usuario:
      canjeo.usuario.nombre +
      " " +
      canjeo.usuario.apellido1 +
      " " +
      canjeo.usuario.apellido2,
    correo: canjeo.usuario.correo,
    contacto: canjeo.usuario.telefono,

    //Material
    materiales: canjeo.canjeoDet,

    total: canjeo.total,
  };
  response.json(datos);
};

//FindMany
//GetByIdUsuario
module.exports.getByIdCliente = async (request, response, next) => {
  let idUsuario = parseInt(request.params.idUsuario);
  const canjeo = await prisma.canjeo.findMany({
    where: { idUsuario: idUsuario },
    include: {
      usuario: true,
      centro: true,
    },
  });

  const datos = canjeo.map((c) => ({
    fecha: c.fecha.toLocaleDateString(),
    centro: c.centro.nombre,
    usuario:
      c.usuario.nombre + " " + c.usuario.apellido1 + " " + c.usuario.apellido2,
    total: c.total,
  }));
  response.json(datos);
};

//En proceso
//GetByIdAdmin
module.exports.getByIdAdmin = async (request, response, next) => {
  let idAdmin = parseInt(request.params.idAdmin);
  const canjeo = await prisma.canjeo.findMany({
    where:{
        centro:{
          idAdmin: idAdmin
        }
    },
    include: {
      canjeoDet:true,
      usuario:true
    }
  });
  
  const datos = canjeo.map(m => ({
    codigo: m.idCanjeo,
    fecha: m.fecha.toLocaleDateString(),
    usuario: m.usuario.nombre + " " + m.usuario.apellido1,
    contacto: m.usuario.correo
  }))
  response.json(datos); 
};

//Crear
module.exports.create = async (request, response, next) => {
  let info = request.body;
  const newCanjeo = await prisma.canjeo.create({
    data: {
      idCentro: info.idCentro,
      idUsuario: info.idUsuario,
      fecha: new Date(info.fecha),
      total: info.total, 
      canjeoDet: {
        createMany: {
          //[{idMaterial, cantidad, subtotal}]
          data: info.canjeoDet,
        },
      },
    },
  });
  response.json(newCanjeo);
};
