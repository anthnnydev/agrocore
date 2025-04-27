/*
  Warnings:

  - You are about to drop the column `tipo` on the `Proveedor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Proveedor" DROP COLUMN "tipo",
ADD COLUMN     "tipoId" TEXT;

-- CreateTable
CREATE TABLE "TipoProveedor" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "TipoProveedor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TipoProveedor_nombre_key" ON "TipoProveedor"("nombre");

-- AddForeignKey
ALTER TABLE "Proveedor" ADD CONSTRAINT "Proveedor_tipoId_fkey" FOREIGN KEY ("tipoId") REFERENCES "TipoProveedor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
