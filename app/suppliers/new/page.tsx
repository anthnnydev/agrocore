'use client';

import { useRouter } from 'next/navigation';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { useSupplierMutations } from '@/src/hooks/suppliers/useSupplierStore';
import { useSupplierStore } from '@/src/store/suppliers.store';
import { SupplierFormData } from '@/src/types/supplier.types';
import { getQueryClient } from '@/src/hooks/useQueryConfig';
import SupplierForm from '@/components/suppliers/SupplierForm';

export default function NewSupplierPage() {
  const router = useRouter();
  const queryClient = getQueryClient();
  const { handleCreateSupplier } = useSupplierMutations();
  const { isSubmitting } = useSupplierStore();

  const onCancel = () => {
    router.push('/suppliers');
  };

  const onSubmit = (data: SupplierFormData) => {
    handleCreateSupplier(data);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Toaster position="top-right" />
        <SupplierForm
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      </div>
    </QueryClientProvider>
  );
}