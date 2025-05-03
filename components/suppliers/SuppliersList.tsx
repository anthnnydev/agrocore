import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import { SupplierListProps } from "@/src/types/supplier.types";

export default function SupplierList({ suppliers, onEdit, onDelete }: SupplierListProps) {
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Listado de Proveedores</h3>
      </div>
      <div className="border-t border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Proveedor</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Tipo</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Ciudad</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Gastos</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Fecha registro</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {suppliers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-4 text-center text-sm text-gray-500">
                    No hay proveedores registrados
                  </td>
                </tr>
              ) : (
                suppliers.map((supplier) => (
                  <tr key={supplier.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 text-lg">
                          {supplier.nombre.charAt(0).toUpperCase()}
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">{supplier.nombre}</div>
                          <div className="text-gray-500">{supplier.email || "Sin email"}</div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {supplier.tipo ? supplier.tipo.nombre : "Sin asignar"}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {supplier.ciudad || "No especificada"}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {supplier._count.gastos}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {dayjs(supplier.createdAt).format("D MMM, YYYY")}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => onEdit(supplier)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <PencilIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                        <button
                          onClick={() => onDelete(supplier)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <TrashIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
