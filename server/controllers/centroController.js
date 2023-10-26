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
                valor: true
            }
        }
      },
    });
  const datos= {
    nombre: centro.nombre,
    telefono: centro.telefono,
    horario: centro.horario.dias + " - " + centro.horario.horas,
    administrador: {
        nombre: centro.administrador.nombre + " " + centro.administrador.apellido1 + " " + centro.administrador.apellido2,
        correo: centro.administrador.correo,
        cedula: centro.administrador.cedula
    },
    direccion: centro.direccion.provincia + ", " + centro.direccion.canton + ", " + 
            centro.direccion.distrito + ". " + centro.direccion.senas,
    materiales: centro.materiales 

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
                valor: true
            }
        }
      }
    });
  const datos= centro.map(centro =>({
    nombre: centro.nombre,
    telefono: centro.telefono,
    horario: centro.horario.dias + " - " + centro.horario.horas,
    administrador: {
        nombre: centro.administrador.nombre + " " + centro.administrador.apellido1 + " " + centro.administrador.apellido2,
        correo: centro.administrador.correo,
        cedula: centro.administrador.cedula
    },
    direccion: centro.direccion.provincia + ", " + centro.direccion.canton + ", " + 
            centro.direccion.distrito + ". " + centro.direccion.senas,
    materiales: centro.materiales 

  })); 
    response.json(datos);
};

