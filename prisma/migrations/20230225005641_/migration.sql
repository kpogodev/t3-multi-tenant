/*
  Warnings:

  - You are about to drop the column `tenantId` on the `Site` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Site` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Site_tenantId_key` ON `Site`;

-- AlterTable
ALTER TABLE `Site` DROP COLUMN `tenantId`,
    ADD COLUMN `userId` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Site_userId_key` ON `Site`(`userId`);
