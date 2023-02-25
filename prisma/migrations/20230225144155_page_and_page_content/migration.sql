/*
  Warnings:

  - You are about to drop the column `draft` on the `PageContent` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `PageContent` table. All the data in the column will be lost.
  - You are about to drop the `Subpage` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `Page` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Page_siteId_idx` ON `Page`;

-- AlterTable
ALTER TABLE `Page` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `parentId` VARCHAR(191) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `PageContent` DROP COLUMN `draft`,
    DROP COLUMN `published`,
    ADD COLUMN `richText` JSON NULL,
    ADD COLUMN `richTextDraf` JSON NULL;

-- DropTable
DROP TABLE `Subpage`;

-- CreateIndex
CREATE INDEX `Page_siteId_parentId_name_slug_id_idx` ON `Page`(`siteId`, `parentId`);
