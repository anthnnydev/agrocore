'use client';

import { useRouter } from 'next/navigation';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { useSupplierTypeMutations } from '@/src/hooks/supplier-types/useSupplierTypeStore';
import { useSupplierTypeStore } from '@/src/store/suppliertype.store';
import { SupplierTypeFormData } from '@/src/types/suppliertype.type';
import { getQueryClient } from '@/src/hooks/useQueryConfig';
import SupplierTypesForm from '@/components/supplier-types/SupplierTypesForm';

export default function NewTypeSupplierPage() {
  const router = useRouter();
  const queryClient = getQueryClient();
  const { handleCreateSupplierType } = useSupplierTypeMutations();
  const { isSubmitting } = useSupplierTypeStore();

  const onCancel = () => {
    router.push('/settings/supplier-types');
  };

  const onSubmit = (data: SupplierTypeFormData) => {
    handleCreateSupplierType(data);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Toaster position="top-right" />
        <SupplierTypesForm
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      </div>
    </QueryClientProvider>
  );
}