-- DropIndex
DROP INDEX `Component_siteId_key` ON `Component`;

-- CreateIndex
CREATE INDEX `Component_siteId_idx` ON `Component`(`siteId`);
