/*
  Warnings:

  - A unique constraint covering the columns `[organizationId]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[organizationId]` on the table `TeamMember` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `organizationId` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationId` to the `TeamMember` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "organizationId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "TeamMember" ADD COLUMN     "organizationId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Project_organizationId_key" ON "Project"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "TeamMember_organizationId_key" ON "TeamMember"("organizationId");

-- AddForeignKey
ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
