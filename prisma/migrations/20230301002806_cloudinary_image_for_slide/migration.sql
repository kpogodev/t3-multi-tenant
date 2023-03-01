/*
  Warnings:

  - You are about to drop the column `key` on the `Slide` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Slide` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Slideshow` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Slide` DROP COLUMN `key`,
    DROP COLUMN `url`,
    ADD COLUMN `order` INTEGER NULL;

-- AlterTable
ALTER TABLE `Slideshow` DROP COLUMN `name`,
    ADD COLUMN `interval` INTEGER NULL DEFAULT 5000;

-- CreateTable
CREATE TABLE `ExternalImage` (
    `id` VARCHAR(191) NOT NULL,
    `slideId` VARCHAR(191) NULL,
    `asset_id` VARCHAR(191) NULL,
    `public_id` VARCHAR(191) NULL,
    `width` INTEGER NOT NULL,
    `height` INTEGER NOT NULL,
    `format` VARCHAR(191) NULL,
    `resource_type` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NULL,
    `bytes` INTEGER NULL,
    `type` VARCHAR(191) NULL,
    `placeholder` BOOLEAN NULL,
    `url` VARCHAR(191) NULL,
    `secure_url` VARCHAR(191) NOT NULL,
    `folder` VARCHAR(191) NULL,
    `access_mode` VARCHAR(191) NULL,

    UNIQUE INDEX `ExternalImage_slideId_key`(`slideId`),
    INDEX `ExternalImage_slideId_idx`(`slideId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
