/*
  Warnings:

  - A unique constraint covering the columns `[welcomeBlockId]` on the table `ComponentsRelation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slideshowId]` on the table `ComponentsRelation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `ComponentsRelation_welcomeBlockId_key` ON `ComponentsRelation`(`welcomeBlockId`);

-- CreateIndex
CREATE UNIQUE INDEX `ComponentsRelation_slideshowId_key` ON `ComponentsRelation`(`slideshowId`);
