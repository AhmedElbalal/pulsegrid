/*
  Warnings:

  - You are about to drop the column `props` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `ts` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Report` table. All the data in the column will be lost.
  - Added the required column `title` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "props",
DROP COLUMN "ts",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Report" DROP COLUMN "name",
ADD COLUMN     "eventType" TEXT,
ADD COLUMN     "title" TEXT NOT NULL;
