import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import ExpensesList from "@/components/expenses/ExpensesList";

export default async function ExpensesPage() {
  const gastos = await prisma.gasto.findMany({
    include: {
      lote: true,
      proveedor: true,
    },
    orderBy: {
      fecha: "desc",
    },
  });

  return (
    <div className="p-2">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Gastos</h1>
        <Link href="/expenses/new">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
            + Nuevo Gasto
          </button>
        </Link>
      </div>

      <ExpensesList gastos={gastos} />
    </div>
  );
}
