/*
  Warnings:

  - You are about to alter the column `balance` on the `User` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(9,3)`.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "dayStrak" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "minutesCounter" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "balance" SET DATA TYPE DECIMAL(9,3);
