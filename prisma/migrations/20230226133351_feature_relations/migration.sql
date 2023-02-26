/*
  Warnings:

  - You are about to drop the `Homepage` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `featureId` on table `Slideshow` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `Slideshow_featureId_key` ON `Slideshow`;

-- AlterTable
ALTER TABLE `Slideshow` MODIFY `featureId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Homepage`;

-- CreateIndex
CREATE INDEX `Slideshow_featureId_idx` ON `Slideshow`(`featureId`);
