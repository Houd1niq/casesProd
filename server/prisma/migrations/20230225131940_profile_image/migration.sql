-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profile_image" TEXT;

-- AlterTable
ALTER TABLE "UserItem" ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
