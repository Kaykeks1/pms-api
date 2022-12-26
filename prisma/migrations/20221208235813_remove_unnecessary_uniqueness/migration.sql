/*
  Warnings:

  - Made the column `organizationId` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `organizationId` on table `TeamMember` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "TeamMember" DROP CONSTRAINT "TeamMember_organizationId_fkey";

-- DropIndex
DROP INDEX "Project_organizationId_key";

-- DropIndex
DROP INDEX "Task_projectId_key";

-- DropIndex
DROP INDEX "TeamMember_organizationId_key";

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "organizationId" SET NOT NULL;

-- AlterTable
ALTER TABLE "TeamMember" ALTER COLUMN "organizationId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
