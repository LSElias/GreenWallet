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
      materiales: {
        select: {
          nombre: true,
          descripcion: true,
          imagen: true,
          color: true,
          valor: true,
          idMaterial: true,
        },
      },
    },
  });

  const datos = centro.map((b) => ({
    idCentro: b.idCentro,
    estado: b.estado,
    nombre: b.nombre,
    provincia: b.direccion.provincia,
    telefono: b.telefono,
    sede: b.direccion.provincia,
    materiales: b.materiales,
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
          idMaterial: true,
        },
      },
    },
  });
  const datos = {
    nombre: centro.nombre,
    estado: centro.estado,
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
    idCentro: centro.idCentro,
    estado: centro.estado,
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
    where: { idUsuario: info.administrador },
  });

  const newHorario = await prisma.horario.create({
    data: {
      horas: info.horas,
      dias: info.dias,
    },
  });

  const newDireccion = await prisma.direccion.create({
    data: {
      provincia: info.provinciaValue,
      canton: info.cantonValue,
      distrito: " ",
      senas: info.senas,
    },
  });

  const newMateriales = await prisma.centro.create({
    data: {
      nombre: info.nombre,
      telefono: info.telefono,
      materiales: {
        connect: info.materiales,
      },
      administrador: {
        connect: admin,
      },
      horario: {
        connect: newHorario,
      },
      direccion: {
        connect: newDireccion,
      },
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
          idMaterial: true,
        },
      },
      administrador: true,
      direccion: true,
      horario: true,
    },
  });

  const newDireccion = await prisma.direccion.update({
    where: {
      idDireccion: centro.idDireccion,
    },
    data: {
      provincia: centro.provinciaValue,
      canton: centro.cantonValue,
      senas: centro.senas,
    },
  });

  const newHorario = await prisma.horario.update({
    where: {
      idHorario: centro.idHorario,
    },
    data: {
      dias: centro.dias,
      horas: centro.horas,
    },
  });

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

module.exports.changeEstado = async (request, response, next) => {
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

  const newCentro = await prisma.centro.update({
    where: {
      idCentro: idCentro,
    },
    data: {
      estado: !centro.estado
    },
  });
  
  response.json(newCentro);

};

////// Reportes 

///Admin General 

/*Cant Total de Canjes de Materiales*/
module.exports.getCanjes= async (request, response, next) => {
  
  const result = await prisma.$queryRaw(
    Prisma.sql`SELECT COUNT(distinct c.idCanjeo) AS total FROM canjeo c JOIN canjeodet cd ON cd.idCanjeo = c.idCanjeo JOIN usuario u ON c.idUsuario = u.idUsuario WHERE MONTH(c.fecha) = MONTH(NOW())`
   );

   const totalCanjes = Number(result[0].total); 

  response.json({totalCanjes});
};

/*Estadistica ecom producidas x centro año actual */   
module.exports.getEcomonedas= async (request, response, next) => {
  
  const result = await prisma.$queryRaw(
    Prisma.sql`SELECT ce.nombre as nombre, SUM(total) AS total FROM canjeo c JOIN centro ce ON c.idCentro = ce.idCentro WHERE YEAR(c.fecha) = YEAR(NOW()) AND c.idCentro and ce.idCentro GROUP BY ce.idCentro ORDER BY total DESC`
   )
  response.json(result);
};

/*Sum de tot eco generadas por c. centro */
module.exports.getTotalEcom = async (request, response, next) => {
  
  const result = await prisma.$queryRaw(
    Prisma.sql`SELECT c.nombre AS centro, SUM(m.valor) AS ecomonedas FROM centro c JOIN _centrotomaterial cm ON c.idCentro = cm.A JOIN material m ON cm.B = m.idMaterial WHERE cm.B = m.idMaterial GROUP BY c.nombre ORDER BY ecomonedas DESC`
   )
  response.json(result);
};

/* Cant Canjes de cupones año actual*/
module.exports.getCupones = async (request, response, next) => {
  
  const result = await prisma.$queryRaw(
    Prisma.sql`SELECT COUNT(*) AS cantidad FROM cupon c JOIN usuario u ON c.idUsuario = u.idUsuario JOIN recompensa r ON c.idRecompensa = r.idRecompensas WHERE YEAR(r.fechaAdquision) = YEAR(NOW())`
   )

   const cupon = Number(result[0].cantidad); 

  response.json({cupon});
};

/* Total de ecomo utilizadas en los cupones del año actual*/
module.exports.getCuponesEco = async (request, response, next) => {
  
  const result = await prisma.$queryRaw(
    Prisma.sql`SELECT SUM(r.valor) AS ecomonedas FROM cupon c JOIN usuario u ON c.idUsuario = u.idUsuario JOIN recompensa r ON c.idRecompensa = r.idRecompensas WHERE YEAR(r.fechaAdquision) = YEAR(NOW())`
   )
   
   const eco = Number(result[0].ecomonedas); 

  response.json(eco);
};


