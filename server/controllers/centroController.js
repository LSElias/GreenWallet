const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

//Get
module.exports.get = async (request, response, next) => {
  const centro = await prisma.centro.findMany({
    orderBy: {
      idCentro: 'asc',
    },
    include: {
      administrador: true,
      direccion: true, 
      horario: true
    },
  });

  const datos = centro.map(b => ({
    nombre: b.nombre,
    telefono: b.telefono,
    sede: b.direccion.provincia,
    administrador:       
    b.administrador.nombre + " " + b.administrador.apellido1 + " " + b.administrador.apellido2
  }))

  response.json(datos);
};

//GetByIdCentro
module.exports.getByIdUser = async (request, response, next) => {
    let idUsuario = parseInt(request.params.idUsuario);
    const billetera = await prisma.billetera.findUnique({
      where: { idUsuario: idUsuario },
      include: {
        usuario: true,
      },
    });
  
    const datospers = {
      usuario: {
        cedula: billetera.usuario.cedula,
        telefono: billetera.usuario.telefono,
        correo: billetera.usuario.correo,
        nombre: 
        billetera.usuario.nombre + " " + billetera.usuario.apellido1 + " " + billetera.usuario.apellido2,
      },
      disponibles: billetera.disponibles,
      canjeados: billetera.canjeadas,
      total: billetera.total,
    };
  
    response.json(datospers);
  };