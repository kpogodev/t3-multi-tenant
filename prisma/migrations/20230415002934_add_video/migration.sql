/*
  Warnings:

  - The values [CARD,CONTACT_FORM,IMAGE_BLOCK] on the enum `Feature_type` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[videoId]` on the table `ComponentsRelation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[componentId,videoId]` on the table `ComponentsRelation` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `ComponentsRelation_compoundBlockId_idx` ON `ComponentsRelation`;

-- DropIndex
DROP INDEX `ComponentsRelation_slideshowId_idx` ON `ComponentsRelation`;

-- DropIndex
DROP INDEX `ComponentsRelation_textBlockId_idx` ON `ComponentsRelation`;

-- AlterTable
ALTER TABLE `ComponentsRelation` ADD COLUMN `videoId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Feature` MODIFY `type` ENUM('MAP', 'SLIDESHOW', 'TEXT_BLOCK', 'COMPOUND_BLOCK', 'VIDEO') NOT NULL;

-- CreateTable
CREATE TABLE `Video` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `public_id` VARCHAR(191) NOT NULL,
    `width` INTEGER NOT NULL,
    `height` INTEGER NOT NULL,
    `format` VARCHAR(191) NULL,
    `resource_type` VARCHAR(191) NULL,
    `secure_url` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `ComponentsRelation_videoId_key` ON `ComponentsRelation`(`videoId`);

-- CreateIndex
CREATE UNIQUE INDEX `ComponentsRelation_componentId_videoId_key` ON `ComponentsRelation`(`componentId`, `videoId`);
