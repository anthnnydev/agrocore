'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { useClientMutations } from '@/src/hooks/clients/useClientStore';
import { useClientStore } from '@/src/store/clients.store';
import { ClientFormData } from '@/src/types/client.types';
import { fetchClientById } from '@/src/lib/api/clients';
import { getQueryClient } from '@/src/hooks/useQueryConfig';
import { Cliente } from '@prisma/client';
import ClientForm from '@/components/clients/ClientForm';

export default function EditClientPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const router = useRouter();
  const queryClient = getQueryClient();
  const { handleUpdateClient } = useClientMutations();
  const { isSubmitting } = useClientStore();
  const [client, setClient] = useState<Cliente | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadClient = async () => {
      try {
        const clientData = await fetchClientById(id);
        setClient(clientData);
      } catch (err) {
        setError("Error al cargar el cliente");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadClient();
  }, [id]);

  const onCancel = () => {
    router.push('/clients');
  };

  const onSubmit = (data: ClientFormData) => {
    handleUpdateClient(id, data);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !client) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 mt-8">
        <p>{error || "Cliente no encontrado"}</p>
        <button 
          onClick={() => router.push('/clients')}
          className="mt-2 text-sm font-medium text-red-600 hover:text-red-800"
        >
          Volver a clientes
        </button>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Toaster position="top-right" />
        <ClientForm
          client={client}
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      </div>
    </QueryClientProvider>
  );
}