-- AddForeignKey
ALTER TABLE `Canjeo` ADD CONSTRAINT `Canjeo_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuario`(`idUsuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Canjeo` ADD CONSTRAINT `Canjeo_idCentro_fkey` FOREIGN KEY (`idCentro`) REFERENCES `Centro`(`idCentro`) ON DELETE RESTRICT ON UPDATE CASCADE;
