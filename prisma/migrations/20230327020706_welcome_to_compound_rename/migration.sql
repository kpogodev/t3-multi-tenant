/*
  Warnings:

  - You are about to drop the column `welcomeBlockId` on the `ComponentsRelation` table. All the data in the column will be lost.
  - You are about to drop the column `welcomeBlockId` on the `ExternalImage` table. All the data in the column will be lost.
  - The values [WELCOME_BLOCK] on the enum `Feature_type` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `WelcomeBlock` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[compoundBlockId]` on the table `ComponentsRelation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[textBlockId]` on the table `ComponentsRelation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[componentId,compoundBlockId]` on the table `ComponentsRelation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[componentId,textBlockId]` on the table `ComponentsRelation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[compoundBlockId]` on the table `ExternalImage` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `ComponentsRelation_componentId_welcomeBlockId_key` ON `ComponentsRelation`;

-- DropIndex
DROP INDEX `ComponentsRelation_welcomeBlockId_idx` ON `ComponentsRelation`;

-- DropIndex
DROP INDEX `ComponentsRelation_welcomeBlockId_key` ON `ComponentsRelation`;

-- DropIndex
DROP INDEX `ExternalImage_welcomeBlockId_key` ON `ExternalImage`;

-- AlterTable
ALTER TABLE `ComponentsRelation` DROP COLUMN `welcomeBlockId`,
    ADD COLUMN `compoundBlockId` VARCHAR(191) NULL,
    ADD COLUMN `textBlockId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `ExternalImage` DROP COLUMN `welcomeBlockId`,
    ADD COLUMN `compoundBlockId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Feature` MODIFY `type` ENUM('CARD', 'CONTACT_FORM', 'IMAGE_BLOCK', 'MAP', 'SLIDESHOW', 'TEXT_BLOCK', 'COMPOUND_BLOCK', 'VIDEO') NOT NULL;

-- DropTable
DROP TABLE `WelcomeBlock`;

-- CreateTable
CREATE TABLE `CompoundBlock` (
    `id` VARCHAR(191) NOT NULL,
    `header` VARCHAR(191) NULL,
    `text` LONGTEXT NULL,
    `linkText` VARCHAR(191) NULL,
    `linkUrl` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TextBlock` (
    `id` VARCHAR(191) NOT NULL,
    `text` LONGTEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `ComponentsRelation_compoundBlockId_key` ON `ComponentsRelation`(`compoundBlockId`);

-- CreateIndex
CREATE UNIQUE INDEX `ComponentsRelation_textBlockId_key` ON `ComponentsRelation`(`textBlockId`);

-- CreateIndex
CREATE INDEX `ComponentsRelation_compoundBlockId_idx` ON `ComponentsRelation`(`compoundBlockId`);

-- CreateIndex
CREATE INDEX `ComponentsRelation_textBlockId_idx` ON `ComponentsRelation`(`textBlockId`);

-- CreateIndex
CREATE UNIQUE INDEX `ComponentsRelation_componentId_compoundBlockId_key` ON `ComponentsRelation`(`componentId`, `compoundBlockId`);

-- CreateIndex
CREATE UNIQUE INDEX `ComponentsRelation_componentId_textBlockId_key` ON `ComponentsRelation`(`componentId`, `textBlockId`);

-- CreateIndex
CREATE UNIQUE INDEX `ExternalImage_compoundBlockId_key` ON `ExternalImage`(`compoundBlockId`);
