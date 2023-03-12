/*
  Warnings:

  - You are about to drop the column `data` on the `News` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,siteId]` on the table `Page` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `date` to the `News` table without a default value. This is not possible if the table is not empty.
  - Added the required column `siteId` to the `News` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `News` DROP COLUMN `data`,
    ADD COLUMN `date` DATETIME(3) NOT NULL,
    ADD COLUMN `siteId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Page` ADD COLUMN `hidden` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `special` BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX `News_siteId_idx` ON `News`(`siteId`);

-- CreateIndex
CREATE UNIQUE INDEX `Page_name_siteId_key` ON `Page`(`name`, `siteId`);
