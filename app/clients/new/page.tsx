'use client';

import { useRouter } from 'next/navigation';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { useClientMutations } from '@/src/hooks/clients/useClientStore';
import { useClientStore } from '@/src/store/clients.store';
import { ClientFormData } from '@/src/types/client.types';
import { getQueryClient } from '@/src/hooks/useQueryConfig';
import ClientForm from '@/components/clients/ClientForm';

export default function NewClientPage() {
  const router = useRouter();
  const queryClient = getQueryClient();
  const { handleCreateClient } = useClientMutations();
  const { isSubmitting } = useClientStore();

  const onCancel = () => {
    router.push('/clients');
  };

  const onSubmit = (data: ClientFormData) => {
    handleCreateClient(data);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Toaster position="top-right" />
        <ClientForm
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      </div>
    </QueryClientProvider>
  );
}