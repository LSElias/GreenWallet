const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

//CategoriaMaterial
    //Get
    module.exports.getCatMaterial = async (request, response, next) => {
      const categoriaMaterial = await prisma.categoriaMaterial.findMany({
        orderBy: {
          idCategoriaM: "asc",
        },
      });
      response.json(categoriaMaterial);
    };
    //GetById
    module.exports.getByIdCatMat = async (request, response, next) => {
      let idCategoriaM = parseInt(request.params.idCategoriaM);
      const categoriaMaterial = await prisma.categoriaMaterial.findUnique({
        where: { idCategoriaM: idCategoriaM },
      });
      response.json(categoriaMaterial);
    };

//Estado
    //Get
    module.exports.getEstado = async (request, response, next) => {
      const estado = await prisma.estado.findMany({
        orderBy: {
          idEstado: "asc",
        },
      });
      response.json(estado);
    };
    //GetById
    module.exports.getByIdEstado = async (request, response, next) => {
      let idEstado = parseInt(request.params.idEstado);
      const estado = await prisma.estado.findUnique({
        where: { idEstado: idEstado },
      });
      response.json(estado);
    };

//CategoriaRecompensa
    //Get
    module.exports.getCatRecomp = async (request, response, next) => {
      const categoriaRecom = await prisma.categoriaRecom.findMany({
        orderBy: {
          idCategoria: "asc",
        },
      });
      response.json(categoriaRecom);
    };
    //GetById
    module.exports.getByIdCatRecomp = async (request, response, next) => {
      let idCategoria = parseInt(request.params.idCategoria);
      const categoriaRecom = await prisma.categoriaRecom.findUnique({
        where: { idCategoria: idCategoria },
      });
      response.json(categoriaRecom);
    };

//Rol
    //Get
    module.exports.getRol = async (request, response, next) => {
      const rol = await prisma.rol.findMany({
        orderBy: {
          idRol: "asc",
        },
      });
      response.json(rol);
    };
    //GetById
    module.exports.getByIdRol = async (request, response, next) => {
      let idRol = parseInt(request.params.idRol);
      const rol = await prisma.rol.findUnique({
        where: { idRol: idRol },
      });
      response.json(rol);
    };

//Unidad de Medida
    //Get
    module.exports.getUnidadMed = async (request, response, next) => {
      const unidadMedida = await prisma.unidadMedida.findMany({
        orderBy: {
          idUnidad: "asc",
        },
      });
      response.json(unidadMedida);
    };
    //GetById
    module.exports.getByIdUnidadMed = async (request, response, next) => {
      let idUnidad = parseInt(request.params.idUnidad);
      const unidadMedida= await prisma.unidadMedida.findUnique({
        where: { idUnidad: idUnidad },
      });
      response.json(unidadMedida);
    };