/*
  Warnings:

  - Added the required column `featureId` to the `Component` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Component` ADD COLUMN `featureId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE INDEX `Component_featureId_idx` ON `Component`(`featureId`);
