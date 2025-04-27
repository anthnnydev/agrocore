import SalesList from "@/components/sales/SalesList";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";

export default async function SalesPage() {
  const ventas = await prisma.venta.findMany({
    include: {
      lote: true,
      cliente: true,
    },
    orderBy: {
      fecha: "desc",
    },
  });

  return (
    <div className="p-2">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Ventas</h1>
        <Link href="/sales/new">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
            + Nueva Venta
          </button>
        </Link>
      </div>

      <SalesList ventas={ventas} />
    </div>
  );
}
