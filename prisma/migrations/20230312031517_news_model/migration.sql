/*
  Warnings:

  - A unique constraint covering the columns `[newsId]` on the table `ExternalImage` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `ExternalImage_slideId_idx` ON `ExternalImage`;

-- AlterTable
ALTER TABLE `ExternalImage` ADD COLUMN `newsId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `WelcomeBlock` MODIFY `text` LONGTEXT NULL;

-- CreateTable
CREATE TABLE `News` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `data` DATETIME(3) NOT NULL,
    `author` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `ExternalImage_newsId_key` ON `ExternalImage`(`newsId`);
