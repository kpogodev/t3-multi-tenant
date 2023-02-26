-- DropIndex
DROP INDEX `Component_featureId_key` ON `Component`;

-- CreateIndex
CREATE INDEX `Component_featureId_idx` ON `Component`(`featureId`);
