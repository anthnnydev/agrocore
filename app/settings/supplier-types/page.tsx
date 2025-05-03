'use client';

import { useRouter } from 'next/navigation';
import { QueryClientProvider } from '@tanstack/react-query';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';

import { useSupplierTypeMutations, useSupplierTypeQuery } from '@/src/hooks/supplier-types/useSupplierTypeStore';
import { useSupplierTypeStore } from '@/src/store/suppliertype.store';
import { getQueryClient } from '@/src/hooks/useQueryConfig';

import TypeSupplierList from '@/components/supplier-types/SupplierTypesList';
import DeleteSupplierTypesModal from '@/components/supplier-types/DeleteSupplierTypesModal';

export default function SupplierTypesPage() {
  const router = useRouter();
  const queryClient = getQueryClient();

  const { data: supplierTypes, isLoading, error } = useSupplierTypeQuery();
  const { handleDeleteSupplierType } = useSupplierTypeMutations();

  const {
    selectedSupplierType,
    isDeleteModalOpen,
    isDeleting,
    openDeleteModal,
    closeDeleteModal
  } = useSupplierTypeStore();

  const handleEditSupplierType = (type: any) => {
    router.push(`/settings/supplier-types/${type.id}/edit`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 mt-8">
        <p>Error al cargar los tipos de proveedores. Por favor, intenta nuevamente.</p>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <Toaster position="top-right" />
        
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900">Tipos de Proveedores</h1>
            <p className="mt-2 text-sm text-gray-700">
              Listado de todos los tipos de proveedores registrados en el sistema
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <Link
              href="/settings/supplier-types/new"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
            >
              + Nuevo Tipo de Proveedor
            </Link>
          </div>
        </div>
        
        <div className="mt-8">
          {supplierTypes && (
            <TypeSupplierList
              suppliertype={supplierTypes}
              onEdit={handleEditSupplierType}
              onDelete={openDeleteModal}
            />
          )}
        </div>

        <DeleteSupplierTypesModal
          suppliertype={selectedSupplierType}
          isOpen={isDeleteModalOpen}
          isDeleting={isDeleting}
          onClose={closeDeleteModal}
          onConfirm={handleDeleteSupplierType}
        />
      </div>
    </QueryClientProvider>
  );
}
