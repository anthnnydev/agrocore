import { Venta, Lote, Cliente } from "@prisma/client";
import { formatCurrency } from "@/src/utils";
import { BanknoteIcon } from "lucide-react";
import dayjs from "dayjs";

type VentaWithRelations = Venta & {
  lote: Lote;
  cliente: Cliente;
};

type Props = {
  ventas: VentaWithRelations[];
};

export default function SalesList({ ventas }: Props) {
  return (
    <div className="bg-white rounded-lg shadow divide-y divide-gray-200 space-y-2">
      {ventas.map((venta) => (
        <div
          key={venta.id}
          className="flex justify-between items-center px-6 py-4 hover:bg-gray-50 gap-6"
        >
          {/* Ícono dentro de círculo */}
          <div className="flex items-center justify-center">
            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
              <BanknoteIcon className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          {/* Información de la venta */}
          <div className="flex-1 text-sm">
            <div className="font-semibold text-gray-900 text-lg">
              {venta.cliente.nombre}
            </div>
            <div className="text-gray-700">
              {venta.cantidad} unidades x {formatCurrency(venta.precioUnitario)}
            </div>
            <div className="text-gray-500 text-sm">
              Estado:{" "}
              <span
                className={`font-semibold ${
                  venta.estado === "Pagado"
                    ? "text-green-600"
                    : venta.estado === "Pendiente"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {venta.estado}
              </span>
            </div>
          </div>

          {/* Lado derecho: total, lote y fecha */}
          <div className="text-right text-sm min-w-[120px] pt-1">
            <div className="font-bold text-blue-600">
              {formatCurrency(venta.total)}
            </div>
            <div className="text-gray-400 text-sm">
              Lote: {venta.lote.numeroLote}
            </div>
            <div className="text-gray-400 text-xs">
              {dayjs(venta.fecha).format("D MMM YYYY")}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
