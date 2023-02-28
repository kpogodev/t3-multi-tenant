-- AlterTable
ALTER TABLE `Slideshow` MODIFY `name` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Welcome` MODIFY `header` VARCHAR(191) NULL,
    MODIFY `text` VARCHAR(191) NULL,
    MODIFY `linkText` VARCHAR(191) NULL,
    MODIFY `linkUrl` VARCHAR(191) NULL;
