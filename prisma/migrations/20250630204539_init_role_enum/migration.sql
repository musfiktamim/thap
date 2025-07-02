-- CreateEnum
CREATE TYPE "role" AS ENUM ('sa', 'admin', 'reader', 'user');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "role" NOT NULL DEFAULT 'user';
