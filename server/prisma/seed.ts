//CreateMany - No tienen relacion 
import { PrismaClient } from "@prisma/client";
import {categoriamaterial} from './seeds/categoriamaterial';
import {categoriarecom} from './seeds/categoriarecom';
import {unidadmedida} from './seeds/unidadmedida';
import {rol} from './seeds/rol';
import {estado} from './seeds/estado';
import {direccion} from './seeds/direccion';

const prisma = new PrismaClient();
async function main() {

    //Insetar categoriamaterial 
    await prisma.categoriaMaterial.createMany({
        data: categoriamaterial
    })
    //Insetar categoriarecom 
    await prisma.categoriaRecom.createMany({
        data: categoriarecom
    })
    //Insetar unidadMedida 
    await prisma.unidadMedida.createMany({
        data: unidadmedida
    })
    //Insetar Rol 
    await prisma.rol.createMany({
        data: rol
    })
    //Insetar estado 
    await prisma.estado.createMany({
        data: estado
    })
    //Insetar direccion 
    await prisma.direccion.createMany({
        data: direccion
    })

//Usuario
    await prisma.usuario.create({
        //Instancia de usuario
        //Admin General
        data: {
        idRol: 1,
        nombre: "Eduardo",
        apellido1: "Hernández",
        apellido2: "Solis",
        correo: "solishe@gmail.com",
        contrasena: "123456",
        cedula: "102360214",
        telefono: "89566598"
        }
    });
    await prisma.usuario.create({
        //Admin de Centro
        data: {
            idRol: 2,
            nombre: "Claudia",
            apellido1: "Soto",
            apellido2: "Pesqueira",
            correo: "sotocla@gmail.com",
            contrasena: "123456",
            cedula: "202580852",
            telefono: "85659865"
        }
    });
    await prisma.usuario.create({
        //Cliente1 
        data: {
            idRol: 3,
            nombre: "Emma",
            apellido1: "Williams",
            apellido2: "Jones",
            correo: "williamsjo@gmail.com",
            contrasena: "123456",
            cedula: "201470741",
            telefono: "87588754"
        }
    });
    await prisma.usuario.create({
        //Cliente2
        data: {
            idRol: 3,
            nombre: "Adrian",
            apellido1: "Miller",
            apellido2: "Brown",
            correo: "brownmiller@gmail.com",
            contrasena: "123456",
            cedula: "302130321",
            telefono: "85415225",
        }
    });
    await prisma.usuario.create({
        //Cliente3
        data: {
            idRol: 3,
            nombre: "Victor",
            apellido1: "García",
            apellido2: "Smith",
            correo: "smithg@gmail.com",
            contrasena: "123456",
            cedula: "302130123",
            telefono: "64621554"
        }
    });

//Recompensa
    await prisma.recompensa.create({
    //Instancia de recompensa
    data: {
        idCategoria: 1,
        nombre: "Almuerzo en Soda Yuki",
        descripcion: "El premio consiste en un almuerzo todo incluído desde Sushi hasta Ramen.",
        foto:"",
        valor: 75,
        cantidad: 3,
        //Modificar
        estado: true
        }
    });
    await prisma.recompensa.create({
        data: {
            idCategoria: 2,
            nombre: "Viaje al Proyecto Asis",
            descripcion: "El premio consiste en un viaje todo incluído a La Fortuna de San Carlos.",
            foto:"",
            valor: 100,
            cantidad: 5,
            estado:true
            }
    });
    await prisma.recompensa.create({
        data: {
            idCategoria: 3,
            nombre: "Kit de limpieza sostenible",
            descripcion: "El kit está conformado por 2 cepillos de limpieza de bambú, 2 paños de limpieza biodegradables y 3 esponjas de limpieza naturales.",
            foto:"",
            valor: 80,
            cantidad: 2,
            estado: true
            }
    });

//Cupon
/*
    await prisma.cupon.create({
    //Instancia de recompensa
    data: {
        idUsuario: 3,
        idRecompensa: 1,
        idEstado: 1,
        fechaAdquision: new Date("2023-09-23"),
        fechaExpiracion: new Date("2023-12-25"),
        //QRCODE:
        }
    });
    await prisma.cupon.create({
        data: {
            idUsuario: 4,
            idRecompensa: 2,
            idEstado: 1,
            fechaAdquision: new Date("2023-09-20"),
            fechaExpiracion: new Date("2023-11-15"),
            //QRCODE:
            }
    });
    await prisma.cupon.create({
        data: {
            idUsuario: 5,
            idRecompensa: 3,
            idEstado: 1,
            fechaAdquision: new Date("2023-9-15"),
            fechaExpiracion: new Date("2023-12-25"),
            //QRCODE:
            }
    });
*/

//Material
    await prisma.material.create({
    data: {
        nombre: "Papel de periódico y revistas",
        descripcion: "Los papeles de periódico y revistas son reciclados con el fin reducir a una escala acelerada la contaminación producida.",
        imagen: "",
        idUnidad: 1,
        idCategoria: 3,
        color: "Azul",
        valor: 5
        }
    });
    await prisma.material.create({
        data: {
            nombre: "Papel Norma",
            descripcion: "Los papeles norma son reciclados para elaborar papel reciclado y otros productos. Brindando una segunda oportunidad para la hojas.",
            imagen: "",
            idUnidad: 1,
            idCategoria: 3,
            color: "Azul",
            valor: 5
            }
    });
    await prisma.material.create({
      data: {
          nombre: "Botellas",
          descripcion: "Las botellas serán convertidas en diferentes objetos como: juguetes, heramientas y aparatos electrónicos.",
          imagen: "",
          idUnidad: 2,
          idCategoria: 2,
          color: "Amarillo",
          valor: 8
          }
    });
    await prisma.material.create({
      data: {
          nombre: "Vidrio de color",
          descripcion: "El vidrio que se recicle será utilizado con el fin de crear una gran variedad de productos, desde botellas hasta pavimento de carreteras.",
          imagen: "",
          idUnidad: 1,
          idCategoria: 3,
          color: "Verde",
          valor: 10
          }
    });
    await prisma.material.create({
      data: {
          nombre: "Vidrio transparente",
          descripcion: "El vidrio que se recicle será utilizado con el fin de crear una gran variedad de productos, desde botellas hasta pavimento de carreteras.",
          imagen: "",
          idUnidad: 1,
          idCategoria: 3,
          color: "Verde",
          valor: 10
          }
    });
    await prisma.material.create({
      data: {
          nombre: "Algodón",
          descripcion: "La fibra textil de algodón es reciclada para brindar una segunda vida a los tejidos.",
          imagen: "",
          idUnidad: 1,
          idCategoria: 4,
          color: "Morado",
          valor: 10
          }
    });

//Billetera
    await prisma.billetera.create({
      data: {
          idUsuario: 3,
          disponibles: 40,
          canjeadas: 80,
          total: 120
          }
    });
    await prisma.billetera.create({
      data: {
        idUsuario: 4,
          disponibles: 50,
          canjeadas: 80,
          total: 130
          }
    });
    await prisma.billetera.create({
      data: {
          idUsuario: 5,
          disponibles: 50,
          canjeadas: 50,
          total: 100
          }
    });

//Centro
    await prisma.centro.create({
      data: {
          idAdmin: 2,
          idDireccion: 1,
          nombre: "GreenWallet Alajuela",
          telefono: '24521254'
          }
    });

//Horario 
    await prisma.horario.create({
      data: {
          idCentro: 1,
          dia: "Lunes",
          horaInicio: 9.00,
          horaFin: 4.00
          }
    });

//Canjeo
await prisma.canjeo.create({
  data: {
      idCentro: 1,
      idUsuario: 3,
      fecha: new Date("2023-09-29"),
      total: 1
      }
});
  
}
main()
.then(async()=>{
    await prisma.$disconnect();
}).catch(
    async e=>{
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    }
)