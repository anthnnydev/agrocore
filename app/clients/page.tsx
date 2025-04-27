'use client';

import { useRouter } from 'next/navigation';
import { QueryClientProvider } from '@tanstack/react-query';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';
import { useClientQuery, useClientMutations } from '@/src/hooks/clients/useClientStore';
import { useClientStore } from '@/src/store/clients.store';
import { getQueryClient } from '@/src/hooks/useQueryConfig';
import ClientList from '@/components/clients/ClientList';
import DeleteClientModal from '@/components/clients/DeleteClientModal';

export default function ClientsPage() {
  const router = useRouter();
  const queryClient = getQueryClient();
  const { data: clients, isLoading, error } = useClientQuery();
  const { handleDeleteClient } = useClientMutations();
  
  const { 
    selectedClient, 
    isDeleteModalOpen, 
    isDeleting,
    openDeleteModal, 
    closeDeleteModal 
  } = useClientStore();

  const handleEditClient = (client: any) => {
    router.push(`/clients/${client.id}/edit`);
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
        <p>Error al cargar los clientes. Por favor, intenta nuevamente.</p>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <Toaster position="top-right" />
        
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900">Clientes</h1>
            <p className="mt-2 text-sm text-gray-700">
              Listado de todos los clientes registrados en el sistema
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <Link
              href="/clients/new"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
            >
              + Nuevo Cliente
            </Link>
          </div>
        </div>
        
        <div className="mt-8">
          {clients && (
            <ClientList 
              clients={clients} 
              onEdit={handleEditClient} 
              onDelete={openDeleteModal} 
            />
          )}
        </div>
        
        <DeleteClientModal
          client={selectedClient}
          isOpen={isDeleteModalOpen}
          isDeleting={isDeleting}
          onClose={closeDeleteModal}
          onConfirm={handleDeleteClient}
        />
      </div>
    </QueryClientProvider>
  );
}