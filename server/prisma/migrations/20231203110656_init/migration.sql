/*
  Warnings:

  - You are about to alter the column `contrasena` on the `usuario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(250)` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `cupon` ADD COLUMN `qr` JSON NOT NULL;

-- AlterTable
ALTER TABLE `usuario` MODIFY `contrasena` VARCHAR(250) NOT NULL;
