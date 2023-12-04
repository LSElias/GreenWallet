/*
  Warnings:

  - You are about to alter the column `contrasena` on the `usuario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(250)` to `VarChar(191)`.
  - Added the required column `estado` to the `Centro` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `centro` ADD COLUMN `estado` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `usuario` MODIFY `contrasena` VARCHAR(191) NOT NULL;
