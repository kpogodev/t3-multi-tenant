/*
  Warnings:

  - You are about to drop the column `richTextDraf` on the `PageContent` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Page_siteId_parentId_idx` ON `Page`;

-- AlterTable
ALTER TABLE `PageContent` DROP COLUMN `richTextDraf`,
    ADD COLUMN `richTextDraft` JSON NULL;

-- CreateTable
CREATE TABLE `Homepage` (
    `id` VARCHAR(191) NOT NULL,
    `siteId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Homepage_siteId_key`(`siteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Component` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `themeId` VARCHAR(191) NOT NULL,
    `featureId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Component_featureId_key`(`featureId`),
    INDEX `Component_themeId_idx`(`themeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Feature` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `type` ENUM('SLIDESHOW', 'WELCOME') NOT NULL,

    UNIQUE INDEX `Feature_type_key`(`type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Slideshow` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `featureId` VARCHAR(191) NULL,

    UNIQUE INDEX `Slideshow_featureId_key`(`featureId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Slide` (
    `id` VARCHAR(191) NOT NULL,
    `key` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `slideshowId` VARCHAR(191) NOT NULL,

    INDEX `Slide_slideshowId_idx`(`slideshowId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Welcome` (
    `id` VARCHAR(191) NOT NULL,
    `header` VARCHAR(191) NOT NULL,
    `text` VARCHAR(191) NOT NULL,
    `linkText` VARCHAR(191) NOT NULL,
    `linkUrl` VARCHAR(191) NOT NULL,
    `featureId` VARCHAR(191) NULL,

    UNIQUE INDEX `Welcome_featureId_key`(`featureId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Page_siteId_idx` ON `Page`(`siteId`);

-- CreateIndex
CREATE INDEX `Page_parentId_idx` ON `Page`(`parentId`);
