const { PrismaClient, Prisma } = require("@prisma/client");
const { info } = require("console");
const { parse } = require("path");
const prisma = new PrismaClient();
const qrcode = require('qrcode');


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

  const datos= cupon.map(u => ({
    id: u.idCupon,
    nombre: u.usuario.nombre + " " + u.usuario.apellido1 + " " + u.usuario.apellido2,
    recompensa: u.recompensa.nombre,
    estado: u.estado.nombre
  }))
  response.json(datos);
};

//GetByIdCupon
module.exports.getByIdCupon = async (request, response, next) => {
  let idCupon = parseInt(request.params.idCupon);
  const cupon = await prisma.cupon.findUnique({
    where: { idCupon: idCupon },
    include:
    {
        usuario: true,
        estado: true,
        recompensa: {
          include: {
            categoria: true
          }
        }
    }
  });
  const datos= {
    id: cupon.idCupon,
    qr: cupon.qr,
    estado: cupon.estado.nombre,
    usuario: {
      cedula: cupon.usuario.cedula,
      correo: cupon.usuario.correo,
      telefono: cupon.usuario.telefono,
      nombre: cupon.usuario.nombre + " " + cupon.usuario.apellido1 + " " + cupon.usuario.apellido2,
    }, 
    recompensa: {
      categoria: cupon.recompensa.categoria.nombre,
      nombre: cupon.recompensa.nombre,
      descripcion: cupon.recompensa.descripcion
    }
  }
  response.json(datos);
};

//GetByIdUsuario
module.exports.getByIdUsuario = async (request, response, next) => {
  let idUsuario = parseInt(request.params.idUsuario);
  const cupon = await prisma.cupon.findMany({
    where: { idUsuario: idUsuario },
    include:
    {
        usuario: true,
        recompensa: true,
        estado: true
    }
  });

  const datos= cupon.map(u => ({
    id: u.idCupon,
    nombre: u.usuario.nombre + " " + u.usuario.apellido1 + " " + u.usuario.apellido2,
    recompensa: u.recompensa.nombre,
    estado: u.estado.nombre
  }))
  response.json(datos);
};

//GetByIdRecomp
module.exports.getByIdRecomp = async (request, response, next) => {
  let idRecompensa = parseInt(request.params.idRecompensa);
  const cupon = await prisma.cupon.findMany({
    where: { idRecompensa: idRecompensa },
    include:
    {
        usuario: true,
        recompensa: true,
        estado: true
    }
  });

  const datos= cupon.map(u => ({
    id: u.idCupon,
    nombre: u.usuario.nombre + " " + u.usuario.apellido1 + " " + u.usuario.apellido2,
    recompensa: u.recompensa.nombre,
    estado: u.estado.nombre
  }))
  response.json(datos);
};

//Create 
module.exports.create = async (request, response, next) => {
  let infoCupon = request.body;
  
  const newCupon = await prisma.cupon.create({
    data: {
      idUsuario: infoCupon.idUsuario,
      idRecompensa: infoCupon.idRecompensa,
      idEstado: infoCupon.idEstado
    }
  });

  const usuario = await prisma.usuario.findUnique({
    where: { idUsuario: newCupon.idUsuario },
  });

  const rec = await prisma.recompensa.findUnique({
    where: { idRecompensas: newCupon.idRecompensa },
  });

  const recUp = await prisma.recompensa.update({
    where: {
      idRecompensas:  newCupon.idRecompensa,
    },
    data:{
      cantidad: rec.cantidad - 1
    }
  })

  const infoB = await prisma.billetera.findUnique({
    where: {
      idUsuario: newCupon.idUsuario,
    },
  });

  const newBill = await prisma.billetera.update({
    where: {
      idUsuario: newCupon.idUsuario,
    },
    data: {
      disponibles: infoB.disponibles - rec.valor,
      canjeadas: infoB.canjeadas + rec.valor,
      total: infoB.disponibles + infoB.canjeadas
    }
  });

  const estado = await prisma.estado.findUnique({
    where:{
         idEstado:  newCupon.idEstado
    }
  })

  let data =
    "Cupon #" +  newCupon.idCupon + " | " + " Estado:" + estado.nombre
    + "\n----------------------------------------"
    +"\nCliente: " + usuario.nombre + " " + usuario.apellido1 + " " + usuario.apellido2
    +"\nCédula:" + usuario.cedula
    + "\n----------------------------------------"
    + "\nRecompensa: " + rec.nombre
    + "\nDescripción: " + rec.descripcion
    
    + "\n----------------------------------------";

  let code = await qrcode.toDataURL(data);

  const jsonCupon = await prisma.cupon.update({
    where: {
      idCupon: newCupon.idCupon,
    },
    data: {
      idUsuario: newCupon.idUsuario,
      idRecompensa: newCupon.idRecompensa,
      idEstado: newCupon.idEstado,
      qr: code
    }
  });

  response.json(jsonCupon);
};

//Update
module.exports.update = async (request, response, next) => {
  let infoCupon = request.body;
  let idCupon = parseInt(request.params.idCupon);

  const oldCupon = await prisma.cupon.findUnique({
    where: { idCupon: idCupon },
    include:
    {
        usuario: true,
        recompensa: true,
        estado: true
    }
  });
  const newCupon = await prisma.cupon.update({
    where: {
      idCupon: idCupon,
    },
    data: {
      idUsuario: infoCupon.idUsuario,
      idRecompensa: infoCupon.idRecompensa,
      idEstado: infoCupon.idEstado
    }
  });

  response.json(newCupon);
};
