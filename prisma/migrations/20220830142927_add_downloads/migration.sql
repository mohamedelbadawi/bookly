/*
  Warnings:

  - You are about to drop the column `download` on the `book` table. All the data in the column will be lost.
  - Added the required column `downloads` to the `book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `link` to the `book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `book` DROP COLUMN `download`,
    ADD COLUMN `downloads` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `link` VARCHAR(191) NOT NULL;
