/*
  Warnings:

  - You are about to drop the column `featureId` on the `Slideshow` table. All the data in the column will be lost.
  - You are about to drop the column `featureId` on the `Welcome` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Theme` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Slideshow_featureId_idx` ON `Slideshow`;

-- DropIndex
DROP INDEX `Welcome_featureId_key` ON `Welcome`;

-- AlterTable
ALTER TABLE `Slideshow` DROP COLUMN `featureId`;

-- AlterTable
ALTER TABLE `Welcome` DROP COLUMN `featureId`;

-- CreateTable
CREATE TABLE `ComponentsRelation` (
    `id` VARCHAR(191) NOT NULL,
    `componentId` VARCHAR(191) NOT NULL,
    `welcomeId` VARCHAR(191) NULL,
    `slideshowId` VARCHAR(191) NULL,

    UNIQUE INDEX `ComponentsRelation_componentId_key`(`componentId`),
    UNIQUE INDEX `ComponentsRelation_welcomeId_key`(`welcomeId`),
    UNIQUE INDEX `ComponentsRelation_slideshowId_key`(`slideshowId`),
    INDEX `ComponentsRelation_welcomeId_idx`(`welcomeId`),
    INDEX `ComponentsRelation_slideshowId_idx`(`slideshowId`),
    UNIQUE INDEX `ComponentsRelation_componentId_welcomeId_key`(`componentId`, `welcomeId`),
    UNIQUE INDEX `ComponentsRelation_componentId_slideshowId_key`(`componentId`, `slideshowId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Theme_name_key` ON `Theme`(`name`);
