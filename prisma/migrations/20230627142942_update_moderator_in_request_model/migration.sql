-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_moderatorId_fkey";

-- AlterTable
ALTER TABLE "Request" ALTER COLUMN "moderatorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_moderatorId_fkey" FOREIGN KEY ("moderatorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
