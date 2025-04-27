import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import MortalityList from "@/components/mortality/MortalityList";

export default async function MortalityPage() {
  const mortalities = await prisma.mortalidad.findMany({
    include: {
      lote: true,
    },
    orderBy: {
      fecha: "desc",
    },
  });

  return (
    <div className="p-2">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Registros de Mortalidad</h1>
        <Link href="/mortality/new">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
            + Nuevo Registro
          </button>
        </Link>
      </div>

      <MortalityList mortalities={mortalities} />
    </div>
  );
}