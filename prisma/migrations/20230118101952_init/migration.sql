-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "successorId" INTEGER,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_name_key" ON "user"("name");

-- CreateIndex
CREATE UNIQUE INDEX "user_successorId_key" ON "user"("successorId");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_successorId_fkey" FOREIGN KEY ("successorId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
