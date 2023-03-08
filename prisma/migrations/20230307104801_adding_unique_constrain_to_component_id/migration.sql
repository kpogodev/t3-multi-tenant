/*
  Warnings:

  - A unique constraint covering the columns `[componentId]` on the table `ComponentsRelation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `ComponentsRelation_componentId_key` ON `ComponentsRelation`(`componentId`);
