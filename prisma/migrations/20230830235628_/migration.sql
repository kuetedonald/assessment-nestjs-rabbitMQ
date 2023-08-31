/*
  Warnings:

  - The `tags` column on the `Book` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Tag" AS ENUM ('fiction', 'non_fiction', 'science', 'essay');

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "tags",
ADD COLUMN     "tags" "Tag"[];
