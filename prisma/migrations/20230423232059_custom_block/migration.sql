/*
  Warnings:

  - A unique constraint covering the columns `[imageFieldId]` on the table `ExternalImage` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imageFieldId` to the `ExternalImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ExternalImage` ADD COLUMN `imageFieldId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Feature` MODIFY `type` ENUM('MAP', 'SLIDESHOW', 'TEXT_BLOCK', 'COMPOUND_BLOCK', 'CUSTOM_BLOCK', 'VIDEO') NOT NULL;

-- CreateTable
CREATE TABLE `CustomBlock` (
    `id` VARCHAR(191) NOT NULL,
    `componentId` VARCHAR(191) NOT NULL,

    INDEX `CustomBlock_componentId_idx`(`componentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ShortTextField` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `text` LONGTEXT NULL,
    `customBlockId` VARCHAR(191) NOT NULL,

    INDEX `ShortTextField_customBlockId_idx`(`customBlockId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LongTextField` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `text` LONGTEXT NULL,
    `customBlockId` VARCHAR(191) NOT NULL,

    INDEX `LongTextField_customBlockId_idx`(`customBlockId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LinkField` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `text` VARCHAR(191) NULL,
    `url` VARCHAR(191) NOT NULL,
    `inNewWindow` BOOLEAN NOT NULL DEFAULT false,
    `customBlockId` VARCHAR(191) NOT NULL,

    INDEX `LinkField_customBlockId_idx`(`customBlockId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ImageField` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `customBlockId` VARCHAR(191) NOT NULL,

    INDEX `ImageField_customBlockId_idx`(`customBlockId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NumberField` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `number` INTEGER NOT NULL,
    `customBlockId` VARCHAR(191) NOT NULL,

    INDEX `NumberField_customBlockId_idx`(`customBlockId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CheckBoxField` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `checked` BOOLEAN NOT NULL DEFAULT false,
    `customBlockId` VARCHAR(191) NOT NULL,

    INDEX `CheckBoxField_customBlockId_idx`(`customBlockId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DateField` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `customBlockId` VARCHAR(191) NOT NULL,

    INDEX `DateField_customBlockId_idx`(`customBlockId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `ExternalImage_imageFieldId_key` ON `ExternalImage`(`imageFieldId`);
