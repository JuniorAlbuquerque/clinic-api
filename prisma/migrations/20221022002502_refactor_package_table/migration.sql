/*
  Warnings:

  - You are about to drop the column `type_treatment` on the `packages` table. All the data in the column will be lost.
  - Added the required column `treatment_id` to the `packages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "packages" DROP COLUMN "type_treatment",
ADD COLUMN     "treatment_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "packages" ADD CONSTRAINT "packages_treatment_id_fkey" FOREIGN KEY ("treatment_id") REFERENCES "treatments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
