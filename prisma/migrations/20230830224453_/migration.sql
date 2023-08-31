/*
  Warnings:

  - You are about to drop the column `orderDate` on the `Order` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('created', 'validated', 'cancelled');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "orderDate",
ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'created';
