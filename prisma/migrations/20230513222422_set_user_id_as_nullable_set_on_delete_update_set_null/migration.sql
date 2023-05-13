-- DropForeignKey
ALTER TABLE "movements" DROP CONSTRAINT "movements_userId_fkey";

-- AlterTable
ALTER TABLE "movements" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "movements" ADD CONSTRAINT "movements_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE SET NULL;
