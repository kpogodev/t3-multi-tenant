/*
  Warnings:

  - A unique constraint covering the columns `[tenantId]` on the table `Site` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Site` ADD COLUMN `tenantId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Page` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `siteId` VARCHAR(191) NOT NULL,

    INDEX `Page_siteId_idx`(`siteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Site_tenantId_key` ON `Site`(`tenantId`);
