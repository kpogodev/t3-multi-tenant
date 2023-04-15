/*
  Warnings:

  - You are about to drop the column `name` on the `Video` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Video` DROP COLUMN `name`,
    MODIFY `public_id` VARCHAR(191) NULL,
    MODIFY `width` INTEGER NULL,
    MODIFY `height` INTEGER NULL,
    MODIFY `secure_url` VARCHAR(191) NULL;
