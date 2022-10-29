/*
  Warnings:

  - Added the required column `address` to the `clinic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clinic" ADD COLUMN     "address" TEXT NOT NULL;
