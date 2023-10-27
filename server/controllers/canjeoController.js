const { PrismaClient, Prisma } = require("@prisma/client");
const { info } = require("console");
const { parse } = require("path");
const prisma = new PrismaClient();

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

//GetByIdAdmin
module.exports.getByIdAdmin = async (request, response, next) => {
  let idAdmin = parseInt(request.params.idAdmin);
  const canjeo = await prisma.canjeoDet.findMany({
    select:{
      cantidad:true,
      canjeo:{
        select:{
          fecha: true,
          total:true,
          usuario:{
            select:{
              cedula:true
            }
          }
        }
      }
    },
    where:{
      canjeo:{
        centro:{
          idAdmin: idAdmin
        }
      }
    },
    groupBy:{
      usuario:{
        select:{
          cedula:true
        }
      }
    }
  });

  response.json(canjeo);
};
