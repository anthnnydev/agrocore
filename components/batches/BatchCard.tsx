import Link from "next/link";
import dayjs from "dayjs";
import { Lote, Proveedor } from "@prisma/client";
import { PencilIcon } from "@heroicons/react/24/outline";

type BatchCardProps = {
  lote: Lote & {
    _count: {
      ventas: number;
    };
    proveedor?: Proveedor | null;
  };
};

export default function BatchCard({ lote }: BatchCardProps) {
  return (
    <div className="bg-white shadow rounded-xl p-5 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">{lote.numeroLote}</h3>
        <Link
          href={`/lotes/${lote.id}/edit`}
          className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
        >
          <PencilIcon className="w-4 h-4" />
          Editar
        </Link>
      </div>

      <div className="text-sm text-gray-600">
        <p>Ingreso: <strong>{dayjs(lote.fechaIngreso).format("D MMM, YYYY")}</strong></p>
        <p>Cantidad: <strong>{lote.cantidadInicial}</strong></p>
        <p>Precio Unitario: <strong>${lote.precioUnitario.toFixed(2)}</strong></p>
        <p>Ventas: <strong>{lote._count.ventas}</strong></p>
        <p>Proveedor: <strong>{lote.proveedor?.nombre || "Sin proveedor"}</strong></p>
        <p>
          Estado:{" "}
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full ${
              lote.estado === "Activo"
                ? "bg-green-100 text-green-800"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {lote.estado}
          </span>
        </p>
      </div>
    </div>
  );
}
