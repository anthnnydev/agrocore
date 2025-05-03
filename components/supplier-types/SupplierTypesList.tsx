import { BuildingStorefrontIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { SupplierTypeListProps } from "@/src/types/suppliertype.type";
import Link from "next/link";
import dayjs from "dayjs";

export default function TypeSupplierList({ suppliertype, onEdit, onDelete }: SupplierTypeListProps) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-5 border-b">
        <h2 className="font-semibold text-lg">Listado de Tipos de Proveedores</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b">
              <th className="px-6 py-4 font-medium">Nombre</th>
              <th className="px-6 py-4 font-medium">Proveedores</th>
              <th className="px-6 py-4 font-medium">Fecha registro</th>
              <th className="px-6 py-4 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {suppliertype.map((typesupplier) => (
              <tr key={typesupplier.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <BuildingStorefrontIcon className="h-10 w-10 text-gray-400" />
                    <div className="ml-4">
                      <div className="font-medium text-gray-900">{typesupplier.nombre}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {typesupplier._count.proveedores}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {dayjs(typesupplier.createdAt).format("D MMM, YYYY")}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => onEdit(typesupplier)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <PencilIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                        <button
                          onClick={() => onDelete(typesupplier)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <TrashIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                      </div>
                    </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
