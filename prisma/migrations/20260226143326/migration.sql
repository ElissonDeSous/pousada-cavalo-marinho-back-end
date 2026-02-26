/*
  Warnings:

  - Added the required column `publicId` to the `imgPages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "imgPages" ADD COLUMN     "publicId" TEXT NOT NULL;
