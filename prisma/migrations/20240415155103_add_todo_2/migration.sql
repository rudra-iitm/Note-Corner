/*
  Warnings:

  - You are about to drop the `Todo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "Todo" TEXT;

-- DropTable
DROP TABLE "Todo";

-- CreateTable
CREATE TABLE "Docknote" (
    "id" TEXT NOT NULL,
    "titles" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Docknote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Docknotes" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Docknotes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Docknotes_userId_key" ON "Docknotes"("userId");

-- AddForeignKey
ALTER TABLE "Docknote" ADD CONSTRAINT "Docknote_id_fkey" FOREIGN KEY ("id") REFERENCES "Docknotes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Docknotes" ADD CONSTRAINT "Docknotes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
