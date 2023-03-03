/*
  Warnings:

  - Made the column `slideId` on table `ExternalImage` required. This step will fail if there are existing NULL values in that column.
  - Made the column `public_id` on table `ExternalImage` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bytes` on table `ExternalImage` required. This step will fail if there are existing NULL values in that column.
  - Made the column `order` on table `Slide` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `ExternalImage` MODIFY `slideId` VARCHAR(191) NOT NULL,
    MODIFY `public_id` VARCHAR(191) NOT NULL,
    MODIFY `bytes` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Slide` MODIFY `order` INTEGER NOT NULL;
