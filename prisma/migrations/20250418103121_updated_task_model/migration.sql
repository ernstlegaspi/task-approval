/*
  Warnings:

  - Added the required column `assignedTo` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tokenExpiration` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('APPROVED', 'PENDING', 'REJECTED');

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "assignedTo" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" "TaskStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "token" TEXT NOT NULL,
ADD COLUMN     "tokenExpiration" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
