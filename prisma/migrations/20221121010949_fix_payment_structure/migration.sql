/*
  Warnings:

  - You are about to drop the column `payment_status` on the `appointments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "appointments" DROP COLUMN "payment_status";

-- AlterTable
ALTER TABLE "patients_packages" ADD COLUMN     "payment_schedule" BOOLEAN,
ADD COLUMN     "payment_status" "PaymentStatus" NOT NULL DEFAULT 'PENDING';
