//CreateMany - No tienen relacion
import { PrismaClient } from "@prisma/client";
import { categoriamaterial } from "./seeds/categoriamaterial";
import { categoriarecom } from "./seeds/categoriarecom";
import { unidadmedida } from "./seeds/unidadmedida";
import { rol } from "./seeds/rol";
import { estado } from "./seeds/estado";

const prisma = new PrismaClient();
async function main() {
  //Insetar categoriamaterial
  await prisma.categoriaMaterial.createMany({
    data: categoriamaterial,
  });
  //Insetar categoriarecom
  await prisma.categoriaRecom.createMany({
    data: categoriarecom,
  });
  //Insetar unidadMedida
  await prisma.unidadMedida.createMany({
    data: unidadmedida,
  });
  //Insetar Rol
  await prisma.rol.createMany({
    data: rol,
  });
  //Insetar estado
  await prisma.estado.createMany({
    data: estado,
  });

  //Dirección
  await prisma.direccion.create({
    data: {
      provincia: "Alajuela",
      canton: "Central",
      distrito: "Alajuela",
      senas: "150 mts de la Clinica de Alajuela",
    },
  });
  await prisma.direccion.create({
    data: {
      provincia: "Cartago",
      canton: "Paraíso",
      distrito: "Orosi",
      senas: "50 mts Norte de la Escuela Las Vegas",
    },
  });
  await prisma.direccion.create({
    data: {
      provincia: "Limón",
      canton: "Talamanca",
      distrito: "Cahuita",
      senas: "20 mts antes de El Bodegón, a mano izquierda.",
    },
  });
  await prisma.direccion.create({
    data: {
      provincia: "Guanacaste",
      canton: "Liberia",
      distrito: "Mayorga",
      senas: "20 mts sur de la Iglesía Católica",
    },
  });
  await prisma.direccion.create({
    data: {
      provincia: "San José",
      canton: "Pérez Zeledón",
      distrito: "Platanares",
      senas: "100 mts de Palí",
    },
  });
  await prisma.direccion.create({
    data: {
      provincia: "Heredia",
      canton: "San Isidro",
      distrito: "San Isidro",
      senas: "100 mts de MaxiPalí",
    },
  });

  //Usuario

  //Admin General
  await prisma.usuario.create({
    //Instancia de usuario
    //Admin General
    data: {
      idRol: 1,
      idDireccion: 1,
      nombre: "Eduardo",
      apellido1: "Hernández",
      apellido2: "Solis",
      correo: "solishe@gmail.com",
      contrasena: "123456",
      cedula: "102360214",
      telefono: "89566598",
    },
  });

  //Admin de Centros
  await prisma.usuario.create({
    //Admin de Centro
    data: {
      idRol: 2,
      idDireccion: 2,
      nombre: "Claudia",
      apellido1: "Soto",
      apellido2: "Pesqueira",
      correo: "sotocla@gmail.com",
      contrasena: "123456",
      cedula: "202580852",
      telefono: "85659865",
    },
  });
  await prisma.usuario.create({
    //Admin de Centro
    data: {
      idRol: 2,
      idDireccion: 3,
      nombre: "Gerardo",
      apellido1: "Castro",
      apellido2: "Mendez",
      correo: "mendezsa@gmail.com",
      contrasena: "123456",
      cedula: "302350246",
      telefono: "85956565",
    },
  });
  await prisma.usuario.create({
    //Admin de Centro
    data: {
      idRol: 2,
      idDireccion: 4,
      nombre: "Mary",
      apellido1: "Godwin",
      apellido2: "Shelly",
      correo: "frankshelly@gmail.com",
      contrasena: "123456",
      cedula: "406540258",
      telefono: "88774455",
    },
  });
  await prisma.usuario.create({
    //Admin de Centro
    data: {
      idRol: 2,
      idDireccion: 5,
      nombre: "Thomas",
      apellido1: "Lewis",
      apellido2: "House",
      correo: "houseth@gmail.com",
      contrasena: "123456",
      cedula: "702580147",
      telefono: "65251245",
    },
  });
  //Se usa para presentar en el API
  await prisma.usuario.create({
    //Admin de Centro
    data: {
      idRol: 2,
      idDireccion: 6,
      nombre: "Amelia",
      apellido1: "Roberts",
      apellido2: "Wilson",
      correo: "ameliawil@gmail.com",
      contrasena: "123456",
      cedula: "602130478",
      telefono: "74125445",
    },
  });

  //Clientes
  await prisma.usuario.create({
    //Cliente1
    data: {
      idRol: 3,
      idDireccion: 2,
      nombre: "Emma",
      apellido1: "Williams",
      apellido2: "Jones",
      correo: "williamsjo@gmail.com",
      contrasena: "123456",
      cedula: "201470741",
      telefono: "87588754",
    },
  });
  await prisma.usuario.create({
    //Cliente2
    data: {
      idRol: 3,
      idDireccion: 3,
      nombre: "Adrian",
      apellido1: "Miller",
      apellido2: "Brown",
      correo: "brownmiller@gmail.com",
      contrasena: "123456",
      cedula: "302130321",
      telefono: "85415225",
    },
  });
  await prisma.usuario.create({
    //Cliente3
    data: {
      idRol: 3,
      idDireccion: 4,
      nombre: "Victor",
      apellido1: "García",
      apellido2: "Smith",
      correo: "smithg@gmail.com",
      contrasena: "123456",
      cedula: "302130123",
      telefono: "64621554",
    },
  });
  await prisma.usuario.create({
    //Cliente3
    data: {
      idRol: 3,
      idDireccion: 5,
      nombre: "Noah",
      apellido1: "Murphy",
      apellido2: "Taylor",
      correo: "taylornoah@gmail.com",
      contrasena: "123456",
      cedula: "201590357",
      telefono: "64588522",
    },
  });

  //Recompensa
  await prisma.recompensa.create({
    //Instancia de recompensa
    data: {
      idCategoria: 1,
      nombre: "Almuerzo en Soda Yuki",
      descripcion:
        "El premio consiste en un almuerzo todo incluído desde Sushi hasta Ramen.",
      foto: "re1.jpeg",
      valor: 75,
      cantidad: 3,
      estado: true,
      fechaAdquision: new Date("2023-09-23"),
      fechaExpiracion: new Date("2023-12-25"),
    },
  });
  await prisma.recompensa.create({
    data: {
      idCategoria: 2,
      nombre: "Viaje al Proyecto Asis",
      descripcion:
        "El premio consiste en un viaje todo incluído a La Fortuna de San Carlos.",
      foto: "re2.jpg",
      valor: 100,
      cantidad: 5,
      estado: true,
      fechaAdquision: new Date("2023-09-20"),
      fechaExpiracion: new Date("2023-11-15"),
    },
  });
  await prisma.recompensa.create({
    data: {
      idCategoria: 3,
      nombre: "Kit de limpieza sostenible",
      descripcion:
        "El kit está conformado por 2 cepillos de limpieza de bambú, 2 paños de limpieza biodegradables y 3 esponjas de limpieza naturales.",
      foto: "re3.png",
      valor: 80,
      cantidad: 2,
      estado: true,
      fechaAdquision: new Date("2023-9-15"),
      fechaExpiracion: new Date("2023-12-25"),
    },
  });
  await prisma.recompensa.create({
    data: {
      idCategoria: 3,
      nombre: "Kit de Hidratación",
      descripcion:
        "El kit está conformado por 2 bolsaspara botellas de agua y 1 botella de agua recargable de 2000ml.",
      foto: "re4.png",
      valor: 90,
      cantidad: 5,
      estado: true,
      fechaAdquision: new Date("2023-10-15"),
      fechaExpiracion: new Date("2023-12-20"),
    },
  });

  //Cupon
  await prisma.cupon.create({
    //Instancia de recompensa
    data: {
      idUsuario: 7,
      idRecompensa: 1,
      idEstado: 1,
    },
  });
  await prisma.cupon.create({
    data: {
      idUsuario: 8,
      idRecompensa: 2,
      idEstado: 1,
    },
  });
  await prisma.cupon.create({
    data: {
      idUsuario: 9,
      idRecompensa: 3,
      idEstado: 1,
    },
  });
  await prisma.cupon.create({
    data: {
      idUsuario: 10,
      idRecompensa: 4,
      idEstado: 1,
    },
  });

  //Material
  await prisma.material.create({
    data: {
      nombre: "Papel de periódico y revistas",
      descripcion:
        "Los papeles de periódico y revistas son reciclados con el fin reducir a una escala acelerada la contaminación producida.",
      imagen: "mat1.jpg",
      idUnidad: 1,
      idCategoria: 1,
      color: "#1F456E",
      valor: 5,
    },
  });
  await prisma.material.create({
    data: {
      nombre: "Papel Norma",
      descripcion:
        "Los papeles norma son reciclados para elaborar papel reciclado y otros productos. Brindando una segunda oportunidad para la hojas.",
      imagen: "mat2.jpg",
      idUnidad: 1,
      idCategoria: 1,
      color: "#151E3DD",
      valor: 5,
    },
  });
  await prisma.material.create({
    data: {
      nombre: "Botellas",
      descripcion:
        "Las botellas serán convertidas en diferentes objetos como: juguetes, heramientas y aparatos electrónicos.",
      imagen: "mat3.jpg",
      idUnidad: 2,
      idCategoria: 2,
      color: "#E3C565",
      valor: 8,
    },
  });
  await prisma.material.create({
    data: {
      nombre: "Vidrio de color",
      descripcion:
        "El vidrio que se recicle será utilizado con el fin de crear una gran variedad de productos, desde botellas hasta pavimento de carreteras.",
      imagen: "mat4.jpg",
      idUnidad: 1,
      idCategoria: 3,
      color: "#728C69",
      valor: 10,
    },
  });
  await prisma.material.create({
    data: {
      nombre: "Vidrio transparente",
      descripcion:
        "El vidrio que se recicle será utilizado con el fin de crear una gran variedad de productos, desde botellas hasta pavimento de carreteras.",
      imagen: "mat5.jpeg",
      idUnidad: 1,
      idCategoria: 3,
      color: "#354A21",
      valor: 10,
    },
  });

  //Billetera
  await prisma.billetera.create({
    data: {
      idUsuario: 7,
      disponibles: 40,
      canjeadas: 80,
      total: 120,
    },
  });
  await prisma.billetera.create({
    data: {
      idUsuario: 8,
      disponibles: 50,
      canjeadas: 80,
      total: 130,
    },
  });
  await prisma.billetera.create({
    data: {
      idUsuario: 9,
      disponibles: 50,
      canjeadas: 50,
      total: 100,
    },
  });
  await prisma.billetera.create({
    data: {
      idUsuario: 10,
      disponibles: 50,
      canjeadas: 170,
      total: 100,
    },
  });

  //Horario
  await prisma.horario.create({
    data: {
      dias: "Lunes a Viernes",
      horas: "9:00 am - 5:00 pm",
    },
  });
  await prisma.horario.create({
    data: {
      dias: "Lunes a Sábado",
      horas: "10:00 am - 3:00 pm",
    },
  });
  await prisma.horario.create({
    data: {
      dias: "Martes a Sábado",
      horas: "10:00 am - 3:00 pm",
    },
  });
  await prisma.horario.create({
    data: {
      dias: "Martes a Viernes",
      horas: "12:00 am - 6:00 pm",
    },
  });

  //Centro
  await prisma.centro.create({
    data: {
      idAdmin: 2,
      idDireccion: 2,
      idHorario: 1,
      nombre: "GreenWallet Cartago",
      telefono: "25521254",
      materiales: {
        connect: [{ idMaterial: 1 }, { idMaterial: 2 }, { idMaterial: 3 }],
      },
    },
  });
  await prisma.centro.create({
    data: {
      idAdmin: 3,
      idDireccion: 3,
      idHorario: 2,
      nombre: "GreenWallet Limón",
      telefono: "27521254",
      materiales: {
        connect: [{ idMaterial: 1 }, { idMaterial: 2 }, { idMaterial: 3 }],
      },
    },
  });
  await prisma.centro.create({
    data: {
      idAdmin: 4,
      idDireccion: 4,
      idHorario: 3,
      nombre: "GreenWallet Guanacaste",
      telefono: "26035428",
      materiales: {
        connect: [{ idMaterial: 4 }, { idMaterial: 5 }, { idMaterial: 1 }],
      },
    },
  });
  await prisma.centro.create({
    data: {
      idAdmin: 5,
      idDireccion: 5,
      idHorario: 4,
      nombre: "GreenWallet San José",
      telefono: "22035428",
      materiales: {
        connect: [{ idMaterial: 4 }, { idMaterial: 3 }, { idMaterial: 2 }],
      },
    },
  });

  //Canjeo
  //Centro 1
  await prisma.canjeo.create({
    data: {
      idCentro: 1,
      idUsuario: 7,
      fecha: new Date("2023-10-29"),
      total: 18,
      canjeoDet: {
        createMany: {
          data: [
            { cantidad: 1, idMaterial: 1, subtotal: 5 },
            { cantidad: 1, idMaterial: 2, subtotal: 5 },
            { cantidad: 1, idMaterial: 3, subtotal: 8 },
          ],
        },
      },
    },
  });
  await prisma.canjeo.create({
    data: {
      idCentro: 1,
      idUsuario: 7,
      fecha: new Date("2023-10-30"),
      total: 18,
      canjeoDet: {
        createMany: {
          data: [
            { cantidad: 1, idMaterial: 3, subtotal: 8 },
            { cantidad: 1, idMaterial: 4, subtotal: 10 },
          ],
        },
      },
    },
  });
  //Centro 2
  await prisma.canjeo.create({
    data: {
      idCentro: 2,
      idUsuario: 9,
      fecha: new Date("2023-10-30"),
      total: 15,
      canjeoDet: {
        createMany: {
          data: [
            { cantidad: 1, idMaterial: 2, subtotal: 5 },
            { cantidad: 1, idMaterial: 4, subtotal: 10 },
          ],
        },
      },
    },
  });
  await prisma.canjeo.create({
    data: {
      idCentro: 2,
      idUsuario: 10,
      fecha: new Date("2023-10-31"),
      total: 15,
      canjeoDet: {
        createMany: {
          data: [
            { cantidad: 1, idMaterial: 2, subtotal: 5 },
            { cantidad: 1, idMaterial: 4, subtotal: 10 },
          ],
        },
      },
    },
  });
  await prisma.canjeo.create({
    data: {
      idCentro: 2,
      idUsuario: 7,
      fecha: new Date("2023-10-30"),
      total: 15,
      canjeoDet: {
        createMany: {
          data: [
            { cantidad: 1, idMaterial: 2, subtotal: 5 },
            { cantidad: 1, idMaterial: 4, subtotal: 10 },
          ],
        },
      },
    },
  });
  await prisma.canjeo.create({
    data: {
      idCentro: 2,
      idUsuario: 8,
      fecha: new Date("2023-10-30"),
      total: 18,
      canjeoDet: {
        createMany: {
          data: [
            { cantidad: 1, idMaterial: 1, subtotal: 5 },
            { cantidad: 1, idMaterial: 2, subtotal: 5 },
            { cantidad: 1, idMaterial: 3, subtotal: 8 },
          ],
        },
      },
    },
  });
  //Centro 3
  await prisma.canjeo.create({
    data: {
      idCentro: 3,
      idUsuario: 7,
      fecha: new Date("2023-10-30"),
      total: 15,
      canjeoDet: {
        createMany: {
          data: [
            { cantidad: 1, idMaterial: 2, subtotal: 5 },
            { cantidad: 1, idMaterial: 4, subtotal: 10 },
          ],
        },
      },
    },
  });
  //Centro 4
  await prisma.canjeo.create({
    data: {
      idCentro: 4,
      idUsuario: 8,
      fecha: new Date("2023-10-30"),
      total: 18,
      canjeoDet: {
        createMany: {
          data: [
            { cantidad: 1, idMaterial: 1, subtotal: 5 },
            { cantidad: 1, idMaterial: 2, subtotal: 5 },
            { cantidad: 1, idMaterial: 3, subtotal: 8 },
          ],
        },
      },
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
