/*
  Warnings:

  - Added the required column `DocknotesId` to the `Docknote` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Docknote" DROP CONSTRAINT "Docknote_id_fkey";

-- AlterTable
ALTER TABLE "Docknote" ADD COLUMN     "DocknotesId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Docknote" ADD CONSTRAINT "Docknote_DocknotesId_fkey" FOREIGN KEY ("DocknotesId") REFERENCES "Docknotes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
