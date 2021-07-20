/*
  Warnings:

  - Added the required column `branchName` to the `webhooks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filePath` to the `webhooks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "webhooks" ADD COLUMN     "branchName" TEXT NOT NULL,
ADD COLUMN     "filePath" TEXT NOT NULL;
