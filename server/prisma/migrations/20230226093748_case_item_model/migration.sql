/*
  Warnings:

  - You are about to drop the column `caseId` on the `Item` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_caseId_fkey";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "caseId";

-- CreateTable
CREATE TABLE "CaseItem" (
    "id" SERIAL NOT NULL,
    "caseId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    "drop_rate" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CaseItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CaseItem" ADD CONSTRAINT "CaseItem_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseItem" ADD CONSTRAINT "CaseItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
