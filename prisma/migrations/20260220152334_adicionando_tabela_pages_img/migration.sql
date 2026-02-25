-- CreateTable
CREATE TABLE "imgPages" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "paginasId" INTEGER NOT NULL,
    "createDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "imgPages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "imgPages" ADD CONSTRAINT "imgPages_paginasId_fkey" FOREIGN KEY ("paginasId") REFERENCES "paginas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
