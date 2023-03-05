/*
  Warnings:

  - You are about to drop the column `dayStrak` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "dayStrak",
ADD COLUMN     "dayStreak" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "isDayStreakActive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isFreeCaseAvailable" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "UserItem" ADD COLUMN     "isObtained" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isSold" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");
