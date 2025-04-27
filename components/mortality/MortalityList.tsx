import { Prisma } from "@prisma/client";
import { TrashIcon, EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import dayjs from "dayjs";

type MortalityWithLote = Prisma.MortalidadGetPayload<{
  include: {
    lote: true;
  };
}>;

type Props = {
  mortalities: MortalityWithLote[];
};

export default function MortalityList({ mortalities }: Props) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-5 border-b">
        <h2 className="font-semibold text-lg">Listado de Mortalidad</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b">
              <th className="px-6 py-4 font-medium">Lote</th>
              <th className="px-6 py-4 font-medium">Fecha</th>
              <th className="px-6 py-4 font-medium">Cantidad</th>
              <th className="px-6 py-4 font-medium">Causa</th>
              <th className="px-6 py-4 font-medium">Notas</th>
              <th className="px-6 py-4 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mortalities.map((mortality) => (
              <tr key={mortality.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  {mortality.lote.numeroLote || "Sin nombre"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {dayjs(mortality.fecha).format("D MMM, YYYY")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  {mortality.cantidad}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {mortality.causa || "No especificada"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {mortality.notas || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link
                    href={`/mortality/${mortality.id}/edit`}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    <EyeIcon className="h-5 w-5 inline" />
                  </Link>
                  <button className="text-red-600 hover:text-red-900">
                    <TrashIcon className="h-5 w-5 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
