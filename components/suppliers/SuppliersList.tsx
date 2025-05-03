// components/suppliers/SupplierList.tsx
import { Proveedor, Prisma } from "@prisma/client";
import { BuildingStorefrontIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import dayjs from "dayjs";

type SupplierWithGastos = Prisma.ProveedorGetPayload<{
  include: {
    tipo: true,
    _count: {
      select: {
        gastos: true;
      };
    };
  };
}>;

type Props = {
  suppliers: SupplierWithGastos[];
};

export default function SupplierList({ suppliers }: Props) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-5 border-b">
        <h2 className="font-semibold text-lg">Listado de Proveedores</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b">
              <th className="px-6 py-4 font-medium">Proveedor</th>
              <th className="px-6 py-4 font-medium">Tipo</th>
              <th className="px-6 py-4 font-medium">Ciudad</th>
              <th className="px-6 py-4 font-medium">Gastos</th>
              <th className="px-6 py-4 font-medium">Fecha registro</th>
              <th className="px-6 py-4 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {suppliers.map((supplier) => (
              <tr key={supplier.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <BuildingStorefrontIcon className="h-10 w-10 text-gray-400" />
                    <div className="ml-4">
                      <div className="font-medium text-gray-900">{supplier.nombre}</div>
                      <div className="text-sm text-gray-500">{supplier.email || "Sin email"}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {supplier.tipo ? supplier.tipo.nombre : "Sin asignar"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {supplier.ciudad || "No especificada"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {supplier._count.gastos}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {dayjs(supplier.createdAt).format("D MMM, YYYY")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link href={`/suppliers/${supplier.id}/edit`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                    <PencilIcon className="h-5 w-5 inline" />
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
