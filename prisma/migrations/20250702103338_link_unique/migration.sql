/*
  Warnings:

  - A unique constraint covering the columns `[link]` on the table `Thap` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Thap_link_key" ON "Thap"("link");
