// app/suppliers/page.tsx
import SupplierList from "@/components/suppliers/SuppliersList";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";

export default async function SuppliersPage() {
  const suppliers = await prisma.proveedor.findMany({
    include: {
      _count: {
        select: {
          gastos: true,
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
        <h1 className="text-2xl font-bold">Proveedores</h1>
        <Link href="/suppliers/new">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
            + Nuevo Proveedor
          </button>
        </Link>
      </div>

      <SupplierList suppliers={suppliers} />
    </div>
  );
}