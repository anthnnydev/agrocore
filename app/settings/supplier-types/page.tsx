import TypeSupplierList from "@/components/supplier-types/SupplierTypesList";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";

export default async function TypeSupplierPage() {
  const typesupplier = await prisma.tipoProveedor.findMany({
    include: {
      _count: {
        select: {
          proveedores: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-2">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Tipo de Proveedores</h1>
        <Link href="/settings/supplier-types/new">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
            + Nuevo Tipo de Proveedor
          </button>
        </Link>
      </div>

      <TypeSupplierList typesuppliers={typesupplier} />
    </div>
  );
}