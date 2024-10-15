/*
  Warnings:

  - Added the required column `status` to the `Warehouses` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "WarehouseStatus" AS ENUM ('AVAILABLE', 'FULL');

-- AlterTable
ALTER TABLE "Warehouses" ADD COLUMN     "status" "WarehouseStatus" NOT NULL;
