/*
  Warnings:

  - Added the required column `date` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_hour` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `initial_hour` to the `appointments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "appointments" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "end_hour" TEXT NOT NULL,
ADD COLUMN     "initial_hour" TEXT NOT NULL,
ADD COLUMN     "patient_package_id" INTEGER;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_patient_package_id_fkey" FOREIGN KEY ("patient_package_id") REFERENCES "patients_packages"("id") ON DELETE SET NULL ON UPDATE CASCADE;
