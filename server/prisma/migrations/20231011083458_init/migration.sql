-- CreateTable
CREATE TABLE `Billetera` (
    `idBilletera` INTEGER NOT NULL AUTO_INCREMENT,
    `idUsuario` INTEGER NOT NULL,
    `disponibles` INTEGER NOT NULL,
    `canjeadas` INTEGER NOT NULL,
    `total` INTEGER NOT NULL,

    UNIQUE INDEX `Billetera_idUsuario_key`(`idUsuario`),
    PRIMARY KEY (`idBilletera`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Canjeo` (
    `idCanjeo` INTEGER NOT NULL AUTO_INCREMENT,
    `idUsuario` INTEGER NOT NULL,
    `idCentro` INTEGER NOT NULL,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `total` INTEGER NOT NULL,

    PRIMARY KEY (`idCanjeo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CanjeoDet` (
    `idCanjeo` INTEGER NOT NULL,
    `idMaterial` INTEGER NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `subtotal` INTEGER NOT NULL,

    PRIMARY KEY (`idCanjeo`, `idMaterial`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CategoriaMaterial` (
    `idCategoriaM` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`idCategoriaM`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CategoriaRecom` (
    `idCategoria` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`idCategoria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Centro` (
    `idCentro` INTEGER NOT NULL AUTO_INCREMENT,
    `idAdmin` INTEGER NOT NULL,
    `idDireccion` INTEGER NOT NULL,
    `nombre` VARCHAR(250) NOT NULL,
    `telefono` CHAR(8) NOT NULL,

    PRIMARY KEY (`idCentro`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cupon` (
    `idCupon` INTEGER NOT NULL AUTO_INCREMENT,
    `idUsuario` INTEGER NOT NULL,
    `idRecompensa` INTEGER NOT NULL,
    `idEstado` INTEGER NOT NULL,

    PRIMARY KEY (`idCupon`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Direccion` (
    `idDireccion` INTEGER NOT NULL AUTO_INCREMENT,
    `idUsuario` INTEGER NOT NULL,
    `provincia` VARCHAR(191) NOT NULL,
    `canton` VARCHAR(191) NOT NULL,
    `distrito` VARCHAR(191) NOT NULL,
    `senas` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Direccion_idUsuario_key`(`idUsuario`),
    PRIMARY KEY (`idDireccion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Estado` (
    `idEstado` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idEstado`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Horario` (
    `idHorario` INTEGER NOT NULL AUTO_INCREMENT,
    `idCentro` INTEGER NOT NULL,
    `dias` VARCHAR(191) NOT NULL,
    `horas` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idHorario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Material` (
    `idMaterial` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `descripcion` VARCHAR(150) NOT NULL,
    `imagen` VARCHAR(250) NOT NULL,
    `idUnidad` INTEGER NOT NULL,
    `idCategoria` INTEGER NOT NULL,
    `color` VARCHAR(191) NOT NULL,
    `valor` INTEGER NOT NULL,

    PRIMARY KEY (`idMaterial`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Recompensa` (
    `idRecompensas` INTEGER NOT NULL AUTO_INCREMENT,
    `idCategoria` INTEGER NOT NULL,
    `nombre` VARCHAR(150) NOT NULL,
    `descripcion` VARCHAR(150) NOT NULL,
    `foto` VARCHAR(350) NOT NULL,
    `valor` INTEGER NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `fechaAdquision` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fechaExpiracion` DATETIME(3) NOT NULL,

    PRIMARY KEY (`idRecompensas`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rol` (
    `idRol` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`idRol`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UnidadMedida` (
    `idUnidad` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`idUnidad`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `idUsuario` INTEGER NOT NULL AUTO_INCREMENT,
    `idRol` INTEGER NOT NULL,
    `nombre` VARCHAR(50) NOT NULL,
    `apellido1` VARCHAR(50) NOT NULL,
    `apellido2` VARCHAR(50) NOT NULL,
    `correo` VARCHAR(250) NOT NULL,
    `contrasena` VARCHAR(250) NOT NULL,
    `cedula` CHAR(9) NOT NULL,
    `telefono` CHAR(8) NOT NULL,

    UNIQUE INDEX `Usuario_correo_key`(`correo`),
    PRIMARY KEY (`idUsuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CentroToMaterial` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CentroToMaterial_AB_unique`(`A`, `B`),
    INDEX `_CentroToMaterial_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Billetera` ADD CONSTRAINT `Billetera_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuario`(`idUsuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Canjeo` ADD CONSTRAINT `Canjeo_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuario`(`idUsuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Canjeo` ADD CONSTRAINT `Canjeo_idCentro_fkey` FOREIGN KEY (`idCentro`) REFERENCES `Centro`(`idCentro`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CanjeoDet` ADD CONSTRAINT `CanjeoDet_idCanjeo_fkey` FOREIGN KEY (`idCanjeo`) REFERENCES `Canjeo`(`idCanjeo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CanjeoDet` ADD CONSTRAINT `CanjeoDet_idMaterial_fkey` FOREIGN KEY (`idMaterial`) REFERENCES `Material`(`idMaterial`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Centro` ADD CONSTRAINT `Centro_idAdmin_fkey` FOREIGN KEY (`idAdmin`) REFERENCES `Usuario`(`idUsuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Centro` ADD CONSTRAINT `Centro_idDireccion_fkey` FOREIGN KEY (`idDireccion`) REFERENCES `Direccion`(`idDireccion`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cupon` ADD CONSTRAINT `Cupon_idEstado_fkey` FOREIGN KEY (`idEstado`) REFERENCES `Estado`(`idEstado`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cupon` ADD CONSTRAINT `Cupon_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuario`(`idUsuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cupon` ADD CONSTRAINT `Cupon_idRecompensa_fkey` FOREIGN KEY (`idRecompensa`) REFERENCES `Recompensa`(`idRecompensas`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Direccion` ADD CONSTRAINT `Direccion_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuario`(`idUsuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Horario` ADD CONSTRAINT `Horario_idCentro_fkey` FOREIGN KEY (`idCentro`) REFERENCES `Centro`(`idCentro`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Material` ADD CONSTRAINT `Material_idUnidad_fkey` FOREIGN KEY (`idUnidad`) REFERENCES `UnidadMedida`(`idUnidad`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Material` ADD CONSTRAINT `Material_idCategoria_fkey` FOREIGN KEY (`idCategoria`) REFERENCES `CategoriaMaterial`(`idCategoriaM`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Recompensa` ADD CONSTRAINT `Recompensa_idCategoria_fkey` FOREIGN KEY (`idCategoria`) REFERENCES `CategoriaRecom`(`idCategoria`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_idRol_fkey` FOREIGN KEY (`idRol`) REFERENCES `Rol`(`idRol`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CentroToMaterial` ADD CONSTRAINT `_CentroToMaterial_A_fkey` FOREIGN KEY (`A`) REFERENCES `Centro`(`idCentro`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CentroToMaterial` ADD CONSTRAINT `_CentroToMaterial_B_fkey` FOREIGN KEY (`B`) REFERENCES `Material`(`idMaterial`) ON DELETE CASCADE ON UPDATE CASCADE;
