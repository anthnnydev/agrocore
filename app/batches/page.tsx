import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import BatchCard from "@/components/batches/BatchCard";

export default async function LotesPage() {
  const batches = await prisma.lote.findMany({
    include: {
      _count: {
        select: { ventas: true },
      },
      proveedor: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-2 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Lotes</h1>
        <Link href="/lotes/new">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
            + Nuevo Lote
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {batches.map((lote) => (
          <BatchCard key={lote.id} lote={lote} />
        ))}
      </div>
    </div>
  );
}
