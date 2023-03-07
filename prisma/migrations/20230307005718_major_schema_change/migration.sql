/*
  Warnings:

  - You are about to drop the column `featureId` on the `Component` table. All the data in the column will be lost.
  - You are about to drop the column `themeId` on the `Component` table. All the data in the column will be lost.
  - The values [WELCOME] on the enum `Feature_type` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `Welcome` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[siteId]` on the table `Component` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[welcomeBlockId]` on the table `ExternalImage` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `siteId` to the `Component` table without a default value. This is not possible if the table is not empty.
  - Added the required column `themeId` to the `Feature` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Component_featureId_idx` ON `Component`;

-- DropIndex
DROP INDEX `Component_themeId_idx` ON `Component`;

-- DropIndex
DROP INDEX `Feature_type_key` ON `Feature`;

-- AlterTable
ALTER TABLE `Component` DROP COLUMN `featureId`,
    DROP COLUMN `themeId`,
    ADD COLUMN `siteId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `ExternalImage` ADD COLUMN `welcomeBlockId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Feature` ADD COLUMN `themeId` VARCHAR(191) NOT NULL,
    MODIFY `type` ENUM('CARD', 'CONTACT_FORM', 'IMAGE_BLOCK', 'MAP', 'SLIDESHOW', 'TEXT_BLOCK', 'WELCOME_BLOCK', 'VIDEO') NOT NULL;

-- DropTable
DROP TABLE `Welcome`;

-- CreateTable
CREATE TABLE `WelcomeBlock` (
    `id` VARCHAR(191) NOT NULL,
    `header` VARCHAR(191) NULL,
    `text` VARCHAR(191) NULL,
    `linkText` VARCHAR(191) NULL,
    `linkUrl` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Component_siteId_key` ON `Component`(`siteId`);

-- CreateIndex
CREATE UNIQUE INDEX `ExternalImage_welcomeBlockId_key` ON `ExternalImage`(`welcomeBlockId`);

-- CreateIndex
CREATE INDEX `Feature_themeId_idx` ON `Feature`(`themeId`);
