import { Gasto, Lote, Proveedor } from "@prisma/client";
import { formatCurrency } from "@/src/utils";
import { PillIcon, BeefIcon, BanknoteIcon, WrenchIcon} from "lucide-react"
import dayjs from "dayjs";

type GastoWithRelations = Gasto & {
  lote: Lote;
  proveedor: Proveedor | null;
};

type Props = {
  gastos: GastoWithRelations[];
};

function getCategoryIcon(categoria: string) {
  switch (categoria.toLowerCase()) {
    case "alimento":
      return <BeefIcon className="w-8 h-8 text-green-600" />;
    case "medicamentos":
      return <PillIcon className="w-8 h-8 text-red-500" />;
    case "mantenimiento":
      return <WrenchIcon className="w-8 h-8 text-yellow-600" />;
    default:
      return <BanknoteIcon className="w-8 h-8 text-gray-500" />;
  }
}

export default function ExpensesList({ gastos }: Props) {
  return (
    <div className="bg-white rounded-lg shadow divide-y divide-gray-200 space-y-2">
      {gastos.map((gasto) => (
        <div
          key={gasto.id}
          className="flex justify-between items-center px-6 py-4 hover:bg-gray-50 gap-6"
        >
          <div className="flex items-center justify-center">
            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
              {getCategoryIcon(gasto.categoria)}
            </div>
          </div>

          <div className="flex-1 text-sm">
            <div className="font-semibold text-gray-900 text-lg">
              {gasto.categoria}
            </div>
            <div className="text-gray-700">{gasto.concepto}</div>
            <div className="text-gray-500 text-sm">
              Proveedor: {gasto.proveedor?.nombre || "N/A"}
            </div>
          </div>

          <div className="text-right font-semibold text-blue-600 text-sm min-w-[80px] pt-1">
            {formatCurrency(gasto.monto)}
            <div className="text-gray-400 text-sm">
              Lote: {gasto.lote.numeroLote}
            </div>
            <div className="text-gray-400 text-xs">
              {dayjs(gasto.fecha).format("D MMM YYYY")}
            </div>
          </div>
          
        </div>
      ))}
    </div>
  );
}
