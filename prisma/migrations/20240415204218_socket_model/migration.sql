/*
  Warnings:

  - Added the required column `DocknotesId` to the `Docknote` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Docknote" DROP CONSTRAINT "Docknote_id_fkey";

-- AlterTable
ALTER TABLE "Docknote" ADD COLUMN     "DocknotesId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "collaboratoinId" TEXT,
ADD COLUMN     "socketId" TEXT;

-- CreateTable
CREATE TABLE "Invite" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collabration" (
    "id" TEXT NOT NULL,
    "docknoteId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Collabration_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_collaboratoinId_fkey" FOREIGN KEY ("collaboratoinId") REFERENCES "Collabration"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Docknote" ADD CONSTRAINT "Docknote_DocknotesId_fkey" FOREIGN KEY ("DocknotesId") REFERENCES "Docknotes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collabration" ADD CONSTRAINT "Collabration_docknoteId_fkey" FOREIGN KEY ("docknoteId") REFERENCES "Docknote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
