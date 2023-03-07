/*
  Warnings:

  - You are about to drop the column `welcomeId` on the `ComponentsRelation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[welcomeBlockId]` on the table `ComponentsRelation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[componentId,welcomeBlockId]` on the table `ComponentsRelation` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `ComponentsRelation_componentId_welcomeId_key` ON `ComponentsRelation`;

-- DropIndex
DROP INDEX `ComponentsRelation_welcomeId_idx` ON `ComponentsRelation`;

-- DropIndex
DROP INDEX `ComponentsRelation_welcomeId_key` ON `ComponentsRelation`;

-- AlterTable
ALTER TABLE `ComponentsRelation` DROP COLUMN `welcomeId`,
    ADD COLUMN `welcomeBlockId` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `ComponentsRelation_welcomeBlockId_key` ON `ComponentsRelation`(`welcomeBlockId`);

-- CreateIndex
CREATE INDEX `ComponentsRelation_welcomeBlockId_idx` ON `ComponentsRelation`(`welcomeBlockId`);

-- CreateIndex
CREATE UNIQUE INDEX `ComponentsRelation_componentId_welcomeBlockId_key` ON `ComponentsRelation`(`componentId`, `welcomeBlockId`);
